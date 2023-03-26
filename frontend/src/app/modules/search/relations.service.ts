import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, finalize, Observable, of, tap } from 'rxjs';
import { RelationType } from '@shared/types/relations/relation-type.enum';
import { HttpClient } from '@angular/common/http';
import { UrlBuilderService } from '@core/services/url-builder/url-builder.service';
import { RELATIONSHIPS_PATH } from '@shared/routes/relationships';
import { IGraphDto } from '@shared/types/relations/graph.dto.interface';
import { IRelationshipDto } from '@shared/types/relations/relationship.dto.interface';
import { IGraphSearchParamsDto } from '@shared/types/relations/graph-search-params.dto.interface';
import { IUpdateRelationshipDto } from '@shared/types/relations/update-relationship.dto.interface';
import { relationshipDtoMock } from '@shared/mocks/relationship-dto-mock';
import { graphDtoMock } from '@shared/mocks/graph-dto-mock';

@Injectable({
  providedIn: 'root'
})
export class RelationsService {
  private readonly result = new BehaviorSubject<IGraphDto | null>(null);
  readonly result$ = this.result.pipe(distinctUntilChanged());

  private readonly userFirstLevelRelationTypes = new BehaviorSubject<RelationType[]>([]);
  readonly userFirstLevelRelationTypes$ = this.userFirstLevelRelationTypes.pipe(distinctUntilChanged());

  private readonly isLoading = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoading.pipe(distinctUntilChanged());

  constructor(private readonly http: HttpClient) {
  }

  getRelationsBetweenUsers(userId1: string, userId2: string): Observable<IRelationshipDto[]> {
    return of(relationshipDtoMock.slice(0, 3));

    // TODO uncomment when backend's done
    // return this.http.get<IRelationshipDto[]>(
    //   new UrlBuilderService()
    //     .toApi()
    //     .withPostfix(RELATIONSHIPS_PATH)
    //     .withPostfix(userId1)
    //     .withPostfix(userId2)
    //     .build(),
    // );
  }

  getGraph(params: IGraphSearchParamsDto): Observable<IGraphDto> {
    this.isLoading.next(true);

    return of(graphDtoMock).pipe(
      tap(graph => this.result.next(graph)),
      finalize(() => this.isLoading.next(false))
    );

    // TODO uncomment when backend's done
    // return this.http.get<IGraphDto>(
    //   new UrlBuilderService()
    //     .toApi()
    //     .withPostfix(RELATIONSHIPS_PATH)
    //     .withPostfix(GRAPH_PATH)
    //     .build(),
    //   {params: getParamsWithoutNilsAndEmptyStringsOrArrays(params)}
    // ).pipe(
    //   tap(graph => this.result.next(graph)),
    //   finalize(() => this.isLoading.next(false))
    // );
  }

  getUserRelationTypes(userId: string): Observable<RelationType[]> {
    return of([RelationType.Teammates, RelationType.StudiedWith, RelationType.SubordinateTo])
      .pipe(
        tap(relationTypes => this.userFirstLevelRelationTypes.next(relationTypes))
      );

    // TODO uncomment when backend's done
    // return this.http.get<RelationType[]>(
    //   new UrlBuilderService()
    //     .toApi()
    //     .withPostfix(RELATIONSHIPS_PATH)
    //     .withPostfix(USER_RELATION_TYPES_PATH)
    //     .withPostfix(userId)
    //     .build(),
    // ).pipe(
    //   tap(relationTypes => this.userFirstLevelRelationTypes.next(relationTypes))
    // );
  }

  updateRelation(id: string, patchDto: IUpdateRelationshipDto): Observable<IRelationshipDto> {
    return this.http.patch<IRelationshipDto>(
      new UrlBuilderService()
        .toApi()
        .withPostfix(RELATIONSHIPS_PATH)
        .withPostfix(id)
        .build(),
      patchDto
    );
  }
}
