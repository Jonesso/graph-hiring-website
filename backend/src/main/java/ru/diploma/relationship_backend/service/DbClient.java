package ru.diploma.relationship_backend.service;

import static org.neo4j.driver.Values.parameters;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Record;
import org.neo4j.driver.GraphDatabase;
import org.neo4j.driver.Query;
import org.neo4j.driver.Result;
import org.neo4j.driver.Value;
import org.neo4j.driver.internal.InternalNode;
import org.neo4j.driver.internal.InternalRelationship;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.diploma.relationship_backend.model.SearchRelationshipResult;
import ru.diploma.relationship_backend.model.SearchUserResult;
import ru.diploma.relationship_backend.model.User;
import ru.diploma.relationship_backend.model.enums.Language;
import ru.diploma.relationship_backend.model.enums.WorkType;
import ru.diploma.relationship_backend.pojo.GraphResponse;
import ru.diploma.relationship_backend.repository.UserRepository;

public class DbClient implements AutoCloseable {

  private final Driver driver;

  public DbClient(String uri, String user, String password) {
    driver = GraphDatabase.driver(uri, AuthTokens.basic(user, password));
  }

  @Autowired
  UserRepository userRepository;

  @Override
  public void close() {
    driver.close();
  }

  public List<SearchUserResult> search(
      String search,
      String fromUserEmail,
      Integer networkSize,
      String workType,
      List<String> languages,
      String searcherUserEmail,
      int minRate,
      int maxRate,
      int experience
  ) {
    var session = driver.session();
    return session.executeWrite(tx -> {
      var query = new Query("""
          use relationship
          CALL db.index.fulltext.queryNodes("usersSearch", $search) YIELD node as u, score
          WHERE  ( u.workType  = $workType )
          AND  ANY( language in u.languages WHERE language in $languages )
          AND (u.hourlyRate >= $minRate ) AND (u.hourlyRate <= $maxRate )
          AND (u.experience >= $experience )
          AND (u.email <> $fromUserEmail)
          AND (CASE
                WHEN $fromUserEmail <> "null"
                  THEN EXISTS((u)-[:RELATIONSHIP*1.."""
          +
          networkSize
          +
          """
                    ]-(:User {email: $fromUserEmail}))
                    ELSE
                      true
                   END)
              WITH collect(u) as users
              UNWIND users as u
              CALL {
              WITH u
              MATCH (:User {email: $searcherUserEmail})-[r:RELATIONSHIP]-(u)
              WITH size(collect(r)) as relationsCount
              RETURN relationsCount
              }
              CALL {
              WITH u
              MATCH (:User {email: $fromUserEmail})-[r:RELATIONSHIP]-(u)
              WITH size(collect(r)) as relationsWithOriginCount
              RETURN relationsWithOriginCount
              }
              CALL {
              WITH u
              MATCH (relatedUser:User)-[r:RELATIONSHIP]-(u)
              WITH size((collect(distinct relatedUser))) as networkSize
              RETURN networkSize
              }
              RETURN u as user, relationsCount, relationsWithOriginCount, networkSize
                """, parameters(
          "search", search,
          "fromUserEmail", fromUserEmail,
          "workType", workType,
          "languages", languages,
          "searcherUserEmail", searcherUserEmail,
          "minRate", minRate,
          "maxRate", maxRate,
          "experience", experience
      )
      );
      var result = tx.run(query);
      return result.list().stream().map(r -> getSearchUser(r)).collect(Collectors.toList());
    });
  }

  public GraphResponse graph(
      String search,
      String fromUserEmail,
      Integer networkSize,
      String workType,
      List<String> languages,
      String searcherUserEmail,
      int minRate,
      int maxRate,
      int experience,
      List<String> relationTypes
  ) {
    var session = driver.session();
    return session.executeWrite(tx -> {
      var query = new Query("""
          use relationship
          CALL db.index.fulltext.queryNodes("usersSearch", $search) YIELD node as u, score
          WHERE  ( u.workType  = $workType )
          AND  ANY( language in u.languages WHERE language in $languages )
          AND (u.hourlyRate >= $minRate ) AND (u.hourlyRate <= $maxRate )
          AND (u.experience >= $experience )
          AND (u.email <> $fromUserEmail)
          AND (CASE
                WHEN $fromUserEmail <> "null"
                  THEN EXISTS((u)-[:RELATIONSHIP*1.."""
          +
          networkSize
          +
          """
                    ]-(:User {email: $fromUserEmail}))
                    ELSE
                      true
                   END)
              WITH collect(u) as searchSatisfyingUsers
      CALL {
        WITH searchSatisfyingUsers
        UNWIND searchSatisfyingUsers as u
        MATCH path = (u)-[r:RELATIONSHIP*1..
        """+
          networkSize
          +
          """
        ]-(fromUser:User {email: $fromUserEmail})
        WHERE all(rel IN r WHERE rel.type IN $relationTypes)
        RETURN nodes(path) as pathNodes,
               collect(r) as pathRelationships
      }
     WITH apoc.coll.toSet(apoc.coll.flatten(collect(pathNodes))) as users,
           apoc.coll.toSet(apoc.coll.flatten(collect(pathRelationships), true)) as edges,
           searchSatisfyingUsers
      UNWIND users as user
      CALL {
        WITH user
        MATCH (:User {email: $fromUserEmail})-[relation:RELATIONSHIP]-(user)
        WITH size(collect(relation)) as relationsWithOriginCount
        RETURN relationsWithOriginCount
      }
      CALL {
        WITH user
        MATCH (:User {email: $searcherUserEmail})-[relation:RELATIONSHIP]-(user)
        WITH size(collect(relation)) as relationsCount
        RETURN relationsCount
      }
      CALL {
        WITH user
        MATCH (relatedUser:User)-[:RELATIONSHIP]-(user)
        WITH size(apoc.coll.toSet(collect(relatedUser))) as networkSize
        RETURN networkSize
      }
      RETURN edges,
             apoc.coll.toSet(
               collect(user{
                 .*,
                 relationsCount: relationsCount,
                 relationsWithOriginCount: relationsWithOriginCount,
                 networkSize: networkSize,
                 intermediate: CASE WHEN user.email = $fromUserEmail
                                 THEN false
                                 ELSE NOT user IN searchSatisfyingUsers
                               END
               })
             ) as nodes
                """, parameters(
          "search", search,
          "fromUserEmail", fromUserEmail,
          "workType", workType,
          "languages", languages,
          "searcherUserEmail", searcherUserEmail,
          "minRate", minRate,
          "maxRate", maxRate,
          "experience", experience,
          "relationTypes", relationTypes
      )
      );
      var result = tx.run(query);
      return getGraph(result);
    });
  }

  public SearchUserResult getSearchUser(Record record) {
    List<Value> values = record.values();
    Map<String, Object> userData = values.get(0).asMap();
    ZonedDateTime createdAt = (ZonedDateTime) userData.get("createdAt");
    List<Language> languagesList = (List<Language>) ((List) userData.get("languages")).stream()
        .map(it -> Language.valueOf(it.toString())).collect(Collectors.toList());
    Language[] languages = new Language[languagesList.size()];
    languagesList.toArray(languages);
    List<String> keywordsList = (List<String>) ((List) userData.get("keywords")).stream()
        .map(it -> it.toString()).collect(Collectors.toList());
    String[] keywords = new String[keywordsList.size()];
    keywordsList.toArray(keywords);
    return new SearchUserResult(
        values.get(0).asNode().id(),
        (String) userData.get("password"),
        (String) userData.get("email"),
        createdAt.toInstant(),
        (String) userData.get("firstName"),
        (String) userData.get("lastName"),
        (String) userData.get("phone"),
        (String) userData.get("about"),
        WorkType.valueOf(userData.get("workType").toString()),
        Integer.valueOf(userData.get("experience").toString()),
        languages,
        keywords,
        Integer.valueOf(userData.get("hourlyRate").toString()),
        (String) userData.get("avatarSrc"),
        values.get(1).asInt(),
        values.get(2).asInt(),
        values.get(3).asInt(),
        false
    );
  }
  
  private GraphResponse getGraph(Result result) {
    List<Value> values = result.single().values();
    List<Object> edgesData = values.get(0).asList();
    List<Object> nodesData = values.get(1).asList();

    List<SearchRelationshipResult> edges = edgesData.stream().map(it -> {
      Map<String, Object> edgeData = ((InternalRelationship) it).asMap();
      return new SearchRelationshipResult(
          ((InternalRelationship) it).asValue().asRelationship().id(),
          ((ZonedDateTime) edgeData.get("createdAt")).toInstant(),
          ((InternalRelationship) it).asValue().asRelationship().endNodeId(),
          ((InternalRelationship) it).asValue().asRelationship().startNodeId(),
          edgeData.get("description").toString(),
          edgeData.get("type").toString(),
          ((ZonedDateTime) edgeData.get("startAt")).toInstant(),
          ((ZonedDateTime) edgeData.get("endAt")).toInstant()
      );
    }).collect(Collectors.toList());
    SearchRelationshipResult[] edgesArray = new SearchRelationshipResult[edges.size()];
    edges.toArray(edgesArray);

    List<SearchUserResult> nodes = nodesData.stream().map(it -> {
      Map<String, Object> nodeData = (Map<String, Object>) it;
      List<Language> languagesList = (List<Language>) ((List) nodeData.get("languages")).stream()
          .map(t -> Language.valueOf(t.toString())).collect(Collectors.toList());
      Language[] languages = new Language[languagesList.size()];
      languagesList.toArray(languages);
      List<String> keywordsList = (List<String>) ((List) nodeData.get("keywords")).stream()
          .map(t -> t.toString()).collect(Collectors.toList());
      String[] keywords = new String[keywordsList.size()];
      keywordsList.toArray(keywords);
      User user = userRepository.findByEmail((String) nodeData.get("email")).get();
      return new SearchUserResult(
          user.getId(),
          (String) nodeData.get("password"),
          (String) nodeData.get("email"),
          ((ZonedDateTime) nodeData.get("createdAt")).toInstant(),
          (String) nodeData.get("firstName"),
          (String) nodeData.get("lastName"),
          (String) nodeData.get("phone"),
          (String) nodeData.get("about"),
          WorkType.valueOf(nodeData.get("workType").toString()),
          Integer.valueOf(nodeData.get("experience").toString()),
          languages,
          keywords,
          Integer.valueOf(nodeData.get("hourlyRate").toString()),
          (String) nodeData.get("avatarSrc"),
          Integer.valueOf(nodeData.get("relationsCount").toString()),
          Integer.valueOf(nodeData.get("relationsWithOriginCount").toString()),
          Integer.valueOf(nodeData.get("networkSize").toString()),
          Boolean.valueOf(nodeData.get("intermediate").toString())
      );
    }).collect(Collectors.toList());
    SearchUserResult[] nodesArray = new SearchUserResult[nodes.size()];
    nodes.toArray(nodesArray);

    return new GraphResponse(nodesArray, edgesArray);
  }


}

@Configuration
class DbClientInit {

  @Bean
  public DbClient createDbClient() {
    return new DbClient("bolt://localhost:7687/db/relationship", "neo4j", "secret123");
  }
}
