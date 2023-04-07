package ru.diploma.relationship_backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;
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
          AND (CASE WHEN ?#{#fromUserId} > -1
              THEN EXISTS((u)-[:RELATIONSHIP*1..1]-(:User {id: ?#{#fromUserId}}))
              ELSE true END)
          WITH collect(u) as users
          UNWIND users as u
          CALL {
          WITH u
          MATCH (:User {id: $fromUserId})-[relation:RELATIONSHIP]-(u)
          WITH size(collect(relation)) as relationsWithOriginCount
          RETURN relationsWithOriginCount
          }
          CALL {
        WITH u
        MATCH (:User {id: $searcherUserId})-[relation:RELATIONSHIP]-(u)
        WITH size(collect(relation)) as relationsCount
        RETURN relationsCount
      }
          RETURN users
              """
  )
  List<User> search(String search, Long fromUserId, Integer networkSize, WorkType[] workTypes,
      Language[] languages, Long searcherUserId, int minRate, int maxRate, int experience);
}
