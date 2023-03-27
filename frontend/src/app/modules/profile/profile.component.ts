import { Component, OnInit } from '@angular/core';
import { ProfileGuard } from '@modules/profile/profile.guard';
import { HeaderService } from '@modules/header/header.service';
import { AuthService } from '@core/services/auth/auth.service';
import { FullNamePipe } from '@shared/pipes/full-name/full-name.pipe';
import { ProfileService } from '@modules/profile/profile.service';
import { switchMap } from 'rxjs/operators';
import { combineLatest, map, take } from 'rxjs';
import { isNotNil } from '@shared/utils/is-not-nil/is-not-nil';

@Component({
  selector: 'gh-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  whoseNetworkLabel$ = combineLatest([
    this.guard.isMyProfile$,
    this.profile.selectedUser$.pipe(isNotNil())
  ]).pipe(map(([isMyProfile, user]) => isMyProfile
    ? 'Your network'
    : `${user.firstName}'s network`
  ));

  constructor(public readonly guard: ProfileGuard,
              private readonly header: HeaderService,
              private readonly auth: AuthService,
              private readonly fullName: FullNamePipe,
              private readonly profile: ProfileService) {

  }

  ngOnInit(): void {
    this.guard.isMyProfile$
      .pipe(
        switchMap(isMyProfile => isMyProfile ? this.auth.user$ : this.profile.selectedUser$),
        isNotNil(),
        map(user => this.fullName.transform(user)),
        take(1)
      )
      .subscribe(userFullName => this.header.setTitle(`Profile | ${userFullName}`));
  }

}
