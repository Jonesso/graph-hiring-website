import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, catchError, distinctUntilChanged, map, mapTo, Observable, of, take, tap } from 'rxjs';
import { ProfileService } from '@modules/profile/profile.service';
import { AuthService } from '@core/services/auth/auth.service';
import { ProfileComponent } from '@modules/profile/profile.component';
import { SearchService } from '@modules/search/search.service';
import { RelationsService } from '@modules/search/relations.service';

const PROFILE_URL_REGEX = new RegExp(
  'search/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
);

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate, CanDeactivate<ProfileComponent> {
  private readonly isMyProfile = new BehaviorSubject<boolean | null>(null);
  readonly isMyProfile$ = this.isMyProfile.pipe(distinctUntilChanged());

  constructor(private readonly auth: AuthService,
              private readonly profile: ProfileService,
              private readonly search: SearchService,
              private readonly relations: RelationsService,) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.auth.user$.pipe(
      take(1),
      map(user => user?.id.toString() === route.params['id']),
    ).subscribe(isMyProfile => this.isMyProfile.next(isMyProfile));

    return this.search.getUser(route.params['id'])
      .pipe(
        tap(user => {
          this.relations.getUserRelationTypes(user.id).subscribe();
          this.profile.setSelectedUser(user);
        }),
        mapTo(true),
        catchError(() => {
          this.profile.setSelectedUser(null);
          return of(false);
        })
      );
  }

  canDeactivate(component: ProfileComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean {
    const navigatingToOtherProfile = nextState && PROFILE_URL_REGEX.test(nextState?.url);
    if (!navigatingToOtherProfile) {
      this.profile.setSelectedUser(null);
      this.isMyProfile.next(null);
    }

    return true;
  }
}
