import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateRelationDto } from '@shared/types/relations/create-relation.dto.interface';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { IRelationRequestDto } from '@shared/types/relations/relation-request.dto.interface';
import { UrlBuilderService } from '@core/services/url-builder/url-builder.service';
import {
  ACCEPT_RELATION_PATH,
  DECLINE_RELATION_PATH,
  RELATION_REQUESTS_PATH,
  REOPEN_RELATION_PATH
} from '@shared/routes/relation-requests';
import { IGetRelationRequestsDto } from '@shared/types/relations/get-relation-requests.dto.interface';
import { distinctUntilChanged } from 'rxjs/operators';
import { IGetRelationRequestsParamsDto } from '@shared/types/relations/get-relation-requests-params.dto.interface';
import { declinedRelationRequestsDtoMock } from '@shared/mocks/declined-relation-requests-dto-mock';
import { pendingRelationRequestsDtoMock } from '@shared/mocks/pending-relation-requests-dto-mock';
import { IUpdateRelationRequestDto } from '@shared/types/relations/update-relation-request.dto.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private readonly list = new BehaviorSubject<IGetRelationRequestsDto[]>([]);
  readonly list$ = this.list.pipe(distinctUntilChanged());

  constructor(private readonly http: HttpClient) {
  }

  createRelationRequest(relationDto: ICreateRelationDto): Observable<IRelationRequestDto> {
    return this.http.post<IRelationRequestDto>(
      new UrlBuilderService()
        .toApi()
        .withPostfix(RELATION_REQUESTS_PATH)
        .build(),
      relationDto
    );
  }

  get(params: IGetRelationRequestsParamsDto): Observable<IGetRelationRequestsDto[]> {
    if (params.declined) {
      return of(declinedRelationRequestsDtoMock).pipe(
        tap(res => this.list.next(res))
      );
    } else {
      return of(pendingRelationRequestsDtoMock).pipe(
        tap(res => this.list.next(res))
      );
    }

    // TODO: Uncomment when backend's done
    // return this.http.get<IGetRelationRequestsDto[]>(
    //   new UrlBuilderService()
    //     .toApi()
    //     .withPostfix(RELATION_REQUESTS_PATH)
    //     .build(),
    //   {params: getParamsWithoutNilsAndEmptyStringsOrArrays(params)}
    // ).pipe(
    //   tap(res => this.list.next(res))
    // );
  }

  update(requestId: string, updateDto: IUpdateRelationRequestDto): Observable<IRelationRequestDto> {
    return this.http.patch<IRelationRequestDto>(
      new UrlBuilderService()
        .toApi()
        .withPostfix(RELATION_REQUESTS_PATH)
        .withPostfix(requestId)
        .build(),
      updateDto
    );
  }

  decline(requestId: string): Observable<IRelationRequestDto> {
    return this.http.patch<IRelationRequestDto>
    (
      new UrlBuilderService()
        .toApi()
        .withPostfix(RELATION_REQUESTS_PATH)
        .withPostfix(DECLINE_RELATION_PATH)
        .withPostfix(requestId)
        .build(),
      {}
    );
  }

  accept(requestId: string): Observable<IRelationRequestDto> {
    return this.http.delete<IRelationRequestDto>
    (
      new UrlBuilderService()
        .toApi()
        .withPostfix(RELATION_REQUESTS_PATH)
        .withPostfix(ACCEPT_RELATION_PATH)
        .withPostfix(requestId)
        .build(),
    );
  }

  reopen(requestId: string): Observable<IRelationRequestDto> {
    return this.http.patch<IRelationRequestDto>
    (
      new UrlBuilderService()
        .toApi()
        .withPostfix(RELATION_REQUESTS_PATH)
        .withPostfix(REOPEN_RELATION_PATH)
        .withPostfix(requestId)
        .build(),
      {}
    );
  }
}
