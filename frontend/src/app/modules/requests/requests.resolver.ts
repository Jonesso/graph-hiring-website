import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { RequestsService } from '@modules/requests/requests.service';
import { AuthService } from '@core/services/auth/auth.service';
import { IGetRelationRequestsDto } from '@shared/types/relations/get-relation-requests.dto.interface';
import { RelationRequestType } from '@modules/requests/relation-request-type.enum';

@Injectable({
  providedIn: 'root'
})
export class RequestsResolver implements Resolve<IGetRelationRequestsDto[]> {
  constructor(private readonly requestsService: RequestsService, private readonly auth: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IGetRelationRequestsDto[]> {
    switch (route.params['requestType']) {
      case RelationRequestType.ToMe:
        return this.auth.user$.pipe(
          take(1),
          switchMap(user => this.requestsService.get({
            toUserId: user?.id,
            declined: false
          }))
        );

      case RelationRequestType.FromMe:
        return this.auth.user$.pipe(
          take(1),
          switchMap(user => this.requestsService.get({
            fromUserId: user?.id,
            declined: false
          }))
        );

      case RelationRequestType.Declined:
        return this.requestsService.get({declined: true});

      default:
        return of([]);
    }
  }
}
