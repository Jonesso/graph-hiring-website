import { ISearchParamsDto, Languages } from '@shared/types/search/search-params.dto.interface';

export const DEFAULT_SEARCH_PARAMS: Required<ISearchParamsDto> = {
  search: '',
  hourlyRateMin: 0,
  hourlyRateMax: null,
  networkSize: 1,
  relationTypes: [],
  experience: 0,
  languages: [Languages.English],
  workType: null,
  fromUserId: ''
};
