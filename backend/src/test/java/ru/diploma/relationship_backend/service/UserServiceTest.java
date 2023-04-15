package ru.diploma.relationship_backend.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ru.diploma.relationship_backend.model.User;
import ru.diploma.relationship_backend.model.enums.WorkType;
import ru.diploma.relationship_backend.pojo.PatchUserRequest;
import ru.diploma.relationship_backend.repository.UserRepository;

@SpringBootTest
class UserServiceTest {

  @Autowired
  UserService userService;

  @Autowired
  UserRepository userRepository;

  User user = new User("testName", "testLastName", "test@mail.ru", "123test123");

  @BeforeEach
  void setUp() {
    userRepository.deleteAll();
    userRepository.save(user);

  }

  @Test
  void findUserByEmailIfExistTest() {
    User result = userService.getCurrentUser("test@mail.ru");

    assertResult(result);
  }

  @Test
  void findUserByEmailIfNotExistTest() {
    User result = userService.getCurrentUser("21321432242@mail.ru");

    assertNull(result);
  }

  @Test
  void findUserByIdIfExistTest() {
    Long userId = userRepository.findAll().get(0).getId();

    User result = userService.getUserById(userId);

    assertResult(result);
  }

  @Test
  void findUserByIdIfNotExistTest() {
    Long userId = userRepository.findAll().get(0).getId() + 1;

    User result = userService.getUserById(userId);

    assertNull(result);
  }

  @Test
  void patchUserIfExistTest() {
    PatchUserRequest request = new PatchUserRequest();
    request.setFirstName("testName");
    request.setAvatarSrc("data/example/1.png");
    request.setAbout("something new about");
    request.setWorkType(WorkType.Hybrid);

    User result = userService.patchUser(user.getEmail(), request);

    assertNotEquals(user.getAvatarSrc(), result.getAvatarSrc());
    assertNotEquals(user.getAbout(), result.getAbout());
    assertNotEquals(user.getWorkType(), result.getWorkType());
  }

  @Test
  void patchUserIfNotExistTest() {
    PatchUserRequest request = new PatchUserRequest();
    request.setFirstName("testName");
    request.setWorkType(WorkType.Hybrid);

    User result = userService.patchUser("21321432242@mail.ru", request);

    assertNull(result);
  }

  private void assertResult(User result) {
    assertEquals(user.getFirstName(), result.getFirstName());
    assertEquals(user.getLastName(), result.getLastName());
    assertEquals(user.getEmail(), result.getEmail());
    assertEquals(user.getPassword(), result.getPassword());
  }

}
