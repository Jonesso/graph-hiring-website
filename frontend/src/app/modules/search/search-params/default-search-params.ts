import { ISearchParamsDto, Languages } from '@shared/types/search/search-params.dto.interface';

export const DEFAULT_SEARCH_PARAMS: Required<ISearchParamsDto> = {
  search: '',
  rateRange: [1, 1],
  networkSize: 1,
  relationTypes: [],
  experience: 0,
  languages: [Languages.English],
  workType: null,
  fromUserId: ''
};
