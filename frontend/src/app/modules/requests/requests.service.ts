import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateRelationDto } from '@shared/types/relations/create-relation.dto.interface';
import { Observable } from 'rxjs';
import { IRelationRequestDto } from '@shared/types/relations/relation-request.dto.interface';
import { UrlBuilderService } from '@core/services/url-builder/url-builder.service';
import { RELATION_REQUESTS_PATH } from '@shared/routes/relation-requests';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

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
}
