package ru.diploma.relationship_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.diploma.relationship_backend.model.User;
import ru.diploma.relationship_backend.model.enums.WorkType;
import ru.diploma.relationship_backend.pojo.PatchUserRequest;
import ru.diploma.relationship_backend.repository.UserRepository;

@Service
public class UserService {

  @Autowired
  UserRepository userRepository;

  public User patchUser(String email, PatchUserRequest patchUserRequest) {
    User user = getCurrentUser(email);
    if (user == null) {
      return null;
    }
    user.setKeywords(patchUserRequest.getKeywords());
    user.setAbout(patchUserRequest.getAbout());
    user.setAvatarSrc(patchUserRequest.getAvatarSrc());
    user.setExperience(patchUserRequest.getExperience());
    user.setFirstName(patchUserRequest.getFirstName());
    user.setHourlyRate(patchUserRequest.getHourlyRate());
    user.setLanguages(patchUserRequest.getLanguages());
    user.setLastName(patchUserRequest.getLastName());
    user.setWorkType(WorkType.getWOrkTypeByValue(patchUserRequest.getWorkType()));
    user.setPhone(patchUserRequest.getPhone());
    return userRepository.save(user);
  }

  public User getCurrentUser(String email) {
    return userRepository.findByEmail(email).orElse(null);
  }

  public User getUserById(Long id) {
    return userRepository.findById(id).orElse(null);
  }
}
