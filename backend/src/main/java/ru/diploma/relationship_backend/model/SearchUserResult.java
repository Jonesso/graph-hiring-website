package ru.diploma.relationship_backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Node;

@Node
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchUserResult extends User {

    private int total;
    private int relationsCount;
    private int relationsWithOriginCount;
    private int networkSize;
}
