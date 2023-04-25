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
}
