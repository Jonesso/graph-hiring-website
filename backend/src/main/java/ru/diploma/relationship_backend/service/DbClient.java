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
import org.neo4j.driver.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.diploma.relationship_backend.model.SearchUserResult;
import ru.diploma.relationship_backend.model.enums.Language;
import ru.diploma.relationship_backend.model.enums.WorkType;

public class DbClient implements AutoCloseable {

  private final Driver driver;

  public DbClient(String uri, String user, String password) {
    driver = GraphDatabase.driver(uri, AuthTokens.basic(user, password));
  }

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
              MATCH (:User {email: $searcherUserEmail})-[r2]-(r:Relationship)-[r1]-(u)
              WITH size(collect(r)) as relationsCount
              RETURN relationsCount
              }
              CALL {
              WITH u
              MATCH (:User {email: $fromUserEmail})-[r2]-(r:Relationship)-[r1]-(u)
              WITH size(collect(r)) as relationsWithOriginCount
              RETURN relationsWithOriginCount
              }
              CALL {
              WITH u
              MATCH (relatedUser:User)-[r2]-(r:Relationship)-[r1]-(u)
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

}

@Configuration
class DbClientInit {

  @Bean
  public DbClient createDbClient() {
    return new DbClient("bolt://localhost:7687/db/relationship", "neo4j", "secret123");
  }
}
