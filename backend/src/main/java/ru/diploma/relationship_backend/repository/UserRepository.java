package ru.diploma.relationship_backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.diploma.relationship_backend.model.SearchUserResult;
import ru.diploma.relationship_backend.model.User;
import ru.diploma.relationship_backend.model.enums.Language;
import ru.diploma.relationship_backend.model.enums.WorkType;

@Repository
public interface UserRepository extends Neo4jRepository<User, Long> {

  Optional<User> findByEmail(String email);

  boolean existsByEmail(String email);

  @Query(
      value = """
          CALL db.index.fulltext.queryNodes("usersSearch", ?#{#search}) YIELD node as u, score
          WHERE  ( u.workType  in ?#{#workTypes} )
          AND  ANY( language in u.languages WHERE language in ?#{#languages} )
          AND (u.hourlyRate >= ?#{#minRate} ) AND (u.hourlyRate <= ?#{#maxRate} )
          AND (u.experience >= ?#{#experience} )
          AND (u.email <> ?#{#fromUserEmail})
          AND (CASE
                WHEN ?#{#fromUserEmail} <> "null"
                  THEN EXISTS((u)-[:RELATIONSHIP*1..?#{#networkSize}]-(:User {email: ?#{#fromUserEmail}}))
                ELSE
                  true
               END)
          WITH collect(u) as users
          UNWIND users as u
          CALL {
          WITH u
          MATCH (:User {email: ?#{#searcherUserEmail}})-[r2]-(r:Relationship)-[r1]-(u)
          WITH size(collect(r)) as relationsCount
          RETURN relationsCount
          }
          CALL {
          WITH u
          MATCH (:User {email: ?#{#fromUserEmail}})-[r2]-(r:Relationship)-[r1]-(u)
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
              """
  )
  List<SearchUserResult> search(String search, String fromUserEmail, Integer networkSize, WorkType workTypes,
      Language[] languages, String searcherUserEmail, int minRate, int maxRate, int experience);
//  MATCH (u:User)-[r2]-(r:Relationship)-[r1]-(u2:User) where u.email = "myriam.koss@hotmail.com" return u.email, r.type, u2.email

}
