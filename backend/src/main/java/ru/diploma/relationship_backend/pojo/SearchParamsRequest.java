package ru.diploma.relationship_backend.pojo;

import lombok.Getter;
import lombok.Setter;
import ru.diploma.relationship_backend.model.enums.Language;
import ru.diploma.relationship_backend.model.enums.RelationType;
import ru.diploma.relationship_backend.model.enums.WorkType;

@Getter
@Setter
public class SearchParamsRequest {

  private String search = null;
  private Integer[] rateRange = null;
  private Integer networkSize = 1;
  private RelationType[] relationTypes = null;
  private Integer experience = null;
  private Language[] languages = null;
  private WorkType workType = null;
  private Long fromUserId = null;


  public static SearchParamsRequest normalizeData(SearchParamsRequest searchParamsRequest) {
    SearchParamsRequest newSearchParamRequest = new SearchParamsRequest();
    if (searchParamsRequest.getNetworkSize() == null) {
      newSearchParamRequest.setNetworkSize(1);
    } else {
      newSearchParamRequest.setNetworkSize(searchParamsRequest.getNetworkSize());
    }
    if (searchParamsRequest.getRelationTypes().length == 0) {
      newSearchParamRequest.setRelationTypes(RelationType.values());
    } else {
      newSearchParamRequest.setRelationTypes(searchParamsRequest.getRelationTypes());
    }
    if (searchParamsRequest.getExperience() == null) {
      newSearchParamRequest.setExperience(-2);
    } else {
      newSearchParamRequest.setExperience(searchParamsRequest.getExperience());
    }
    if (searchParamsRequest.getLanguages().length == 0) {
      newSearchParamRequest.setLanguages(Language.values());
    } else {
      newSearchParamRequest.setLanguages(searchParamsRequest.getLanguages());
    }
    if (searchParamsRequest.getWorkType() == null) {
      newSearchParamRequest.setWorkType(WorkType.All);
    } else {
      newSearchParamRequest.setWorkType(searchParamsRequest.getWorkType());
    }
    if (searchParamsRequest.getFromUserId() == null) {
      newSearchParamRequest.setFromUserId(-1L);
    } else {
      newSearchParamRequest.setFromUserId(searchParamsRequest.getFromUserId());
    }
    newSearchParamRequest.setSearch("*" + searchParamsRequest.getSearch() + "*~");
    newSearchParamRequest.setRateRange(searchParamsRequest.getRateRange());
    return newSearchParamRequest;
  }
}
