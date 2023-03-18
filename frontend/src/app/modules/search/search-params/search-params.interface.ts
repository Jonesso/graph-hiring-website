import { ISearchParamsDto } from '@shared/types/search/search-params.dto.interface';

export type ISearchParams = Omit<ISearchParamsDto, 'fromUserId'>;
