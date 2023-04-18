package ru.diploma.relationship_backend.model;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.diploma.relationship_backend.model.enums.Language;
import ru.diploma.relationship_backend.model.enums.WorkType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchUserResult  {

//    private User user;
protected Long id;
    protected String password;
    protected String email;
    protected Instant createdAt = Instant.now();
    protected String firstName;
    protected String lastName;
    protected String phone;
    protected String about;
    protected WorkType workType;
    protected Integer experience;
    protected Language[] languages;
    protected String[] keywords;
    protected Integer hourlyRate;
    protected String avatarSrc;
    private int relationsCount;
    private int relationsWithOriginCount;
    private int networkSize;
    private Boolean intermediate;
}
