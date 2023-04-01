package ru.diploma.relationship_backend.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;
import ru.diploma.relationship_backend.model.Relationship;

@Repository
public interface RelationshipRepository extends Neo4jRepository<Relationship, Long> {

}
