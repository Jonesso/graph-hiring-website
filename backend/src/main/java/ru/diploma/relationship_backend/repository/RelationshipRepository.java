package ru.diploma.relationship_backend.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;
import ru.diploma.relationship_backend.model.Relationship;
import ru.diploma.relationship_backend.pojo.GraphResponse;

@Repository
public interface RelationshipRepository extends Neo4jRepository<Relationship, Long> {

  @Query(
      value = """
          CALL db.index.fulltext.queryNodes("usersSearch", ?#{#search}) YIELD node as u, score
          WHERE  ( u.workType  in ?#{#workTypes} )
          AND  ANY( language in u.languages WHERE language in ?#{#languages} )
          AND (u.hourlyRate >= ?#{#minRate} ) AND (u.hourlyRate <= ?#{#maxRate} )
          AND (u.experience >= ?#{#experience} )
          AND (u.email <> ?#{#fromUserEmail})
          WITH collect(u) as searchSatisfyingUsers
          CALL {
        WITH searchSatisfyingUsers
        UNWIND searchSatisfyingUsers as u
        MATCH path = (u)-[r:RELATIONSHIP*1..${params.networkSize || 1}]-(fromUser:User {id: $fromUserId})
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
        MATCH (:User {id: $fromUserId})-[r1]-[relation:RELATIONSHIP]-[r2]-(user)
        WITH size(collect(relation)) as relationsWithOriginCount
        RETURN relationsWithOriginCount
      }
      CALL {
        WITH user
        MATCH (:User {id: $searcherUserId})-[r1]-[relation:RELATIONSHIP]-[r2]-(user)
        WITH size(collect(relation)) as relationsCount
        RETURN relationsCount
      }
      CALL {
        WITH user
        MATCH (relatedUser:User)-[r1]-[:RELATIONSHIP]-[r2]-(user)
        WITH size(collect(distinct relatedUser)) as networkSize
        RETURN networkSize
      }
      RETURN edges,
               collect(distinct user{
                 .*,
                 relationsCount: relationsCount,
                 relationsWithOriginCount: relationsWithOriginCount,
                 networkSize: networkSize,
                 intermediate: CASE WHEN user.id = $fromUserId
                                 THEN false
                                 ELSE NOT user IN searchSatisfyingUsers
                               END
               }
             ) as nodes,
             searchSatisfyingUsers
              """
  )
  GraphResponse getGraphData();

}
