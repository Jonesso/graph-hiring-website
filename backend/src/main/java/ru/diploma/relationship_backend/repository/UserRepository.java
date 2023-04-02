package ru.diploma.relationship_backend.repository;

import java.util.Optional;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;
import ru.diploma.relationship_backend.model.User;

@Repository
public interface UserRepository extends Neo4jRepository<User, Long> {

  Optional<User> findByEmail(String email);

  boolean existsByEmail(String email);

}
