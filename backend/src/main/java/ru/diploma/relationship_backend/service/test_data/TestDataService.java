package ru.diploma.relationship_backend.service.test_data;

import com.github.javafaker.Faker;
import java.time.Instant;
import java.util.LinkedList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.diploma.relationship_backend.model.Relationship;
import ru.diploma.relationship_backend.model.Request;
import ru.diploma.relationship_backend.model.User;
import ru.diploma.relationship_backend.model.enums.RelationType;
import ru.diploma.relationship_backend.model.enums.WorkType;
import ru.diploma.relationship_backend.repository.RelationshipRepository;
import ru.diploma.relationship_backend.repository.RequestRepository;
import ru.diploma.relationship_backend.repository.UserRepository;

@Service
public class TestDataService {

  @Autowired
  public UserRepository userRepository;

  @Autowired
  public RequestRepository requestRepository;

  @Autowired
  public RelationshipRepository relationshipRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  public List<User> createTestUsers() {
    List<User> users = new LinkedList<>();
    for (int i = 0; i < 10; i++) {
      Faker faker = new Faker();
      User user = new User();
      user.setFirstName(faker.name().firstName());
      user.setLastName(faker.name().lastName());
      user.setEmail(faker.internet().emailAddress());
      user.setPhone(faker.phoneNumber().phoneNumber());
      user.setAbout(faker.lorem().paragraph());
      user.setExperience(faker.number().numberBetween(0, 10));
      user.setHourlyRate(faker.number().numberBetween(10, 100));
      user.setAvatarSrc(faker.internet().avatar());
      user.setPassword(passwordEncoder.encode(faker.internet().password()));
      user.setKeywords(faker.lorem().words(5).toArray(new String[0]));
      user.setLanguages(faker.lorem().words(5).toArray(new String[0]));
      user.setWorkType(WorkType.values()[faker.number().numberBetween(0, 2)]);
      users.add(userRepository.save(user));
    }
    return users;
  }

  public List<Request> createTestRequests() {
    List<Request> requests = new LinkedList<>();
    for (int i = 0; i < 5; i++) {
      Faker faker = new Faker();
      Request request = new Request();
      request.setCreatedAt(Instant.now());
      request.setComment(faker.lorem().paragraph());
      request.setDeclined(faker.bool().bool());
      request.setDescription(faker.lorem().paragraph());
      request.setStartAt(Instant.now());
      request.setType(RelationType.values()[faker.number().numberBetween(0, 4)]);

      User user1 = userRepository.findAll().get((int) faker.number().numberBetween(0,
          userRepository.count() - 1));
      request.setToUserId(user1);
      request.setFromUserId(getAnotherUser(user1));
      requests.add(requestRepository.save(request));
    }
    return requests;
  }

  public List<Relationship> createTestRelationships() {
    List<Relationship> relationships = new LinkedList<>();
    for (int i = 0; i < 5; i++) {
      Faker faker = new Faker();
      Relationship relationship = new Relationship();
      relationship.setCreatedAt(Instant.now());
      relationship.setDescription(faker.lorem().paragraph());
      relationship.setStartAt(Instant.now());
      relationship.setType(RelationType.values()[faker.number().numberBetween(0, 4)]);

      User user1 = userRepository.findAll().get((int) faker.number().numberBetween(0,
          userRepository.count() - 1));
      relationship.setToUserId(user1);
      relationship.setFromUserId(getAnotherUser(user1));
      relationships.add(relationshipRepository.save(relationship));
      createAdditionalRelationIfNeeded(relationship.getFromUserId(), relationship.getToUserId(),
          relationship.getType());
    }
    return relationships;
  }

  private User getAnotherUser(User user) {
    List<User> otherUsers = userRepository.findAll();
    otherUsers.remove(user);
    return otherUsers.get(new Faker().number().numberBetween(0, otherUsers.size()));
  }

  private void createAdditionalRelationIfNeeded(User user1, User user2, RelationType type) {
    RelationType backType;
    if (type == RelationType.SUBORDINATE_TO) {
      backType = RelationType.SUPERVISED;
    } else if (type == RelationType.SUPERVISED) {
      backType = RelationType.SUBORDINATE_TO;
    } else {
      return;
    }
    Relationship relationship = new Relationship();
    relationship.setCreatedAt(Instant.now());
    relationship.setDescription("Additional relation");
    relationship.setStartAt(Instant.now());
    relationship.setType(backType);
    relationship.setFromUserId(user2);
    relationship.setToUserId(user1);
    relationshipRepository.save(relationship);
  }

  public void deleteTestData() {
    userRepository.deleteAll();
    requestRepository.deleteAll();
    relationshipRepository.deleteAll();
  }

}
