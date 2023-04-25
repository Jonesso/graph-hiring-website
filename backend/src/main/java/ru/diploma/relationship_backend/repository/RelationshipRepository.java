package ru.diploma.relationship_backend.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;
import ru.diploma.relationship_backend.model.RelationshipEntity;
import ru.diploma.relationship_backend.pojo.GraphResponse;

@Repository
public interface RelationshipRepository extends Neo4jRepository<RelationshipEntity, Long> {

}
