package ru.diploma.relationship_backend.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;
import ru.diploma.relationship_backend.model.Request;

@Repository
public interface RequestRepository extends Neo4jRepository<Request, Long> {

}
