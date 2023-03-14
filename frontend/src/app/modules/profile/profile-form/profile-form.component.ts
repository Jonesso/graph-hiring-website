import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '@modules/profile/profile.service';
import { ErrorService } from '@core/services/error.service';
import { Languages, WorkType } from '@shared/types/search/search-params.dto.interface';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { catchError, Observable, of, skip, switchMap, take, takeUntil, tap } from 'rxjs';
import { IUserDto } from '@shared/types/user/user.dto.interface';
import { isNotNil } from '@shared/utils/is-not-nil/is-not-nil';
import { IProfileInfoChangeEvent } from '@shared/components/profile-info/profile-info.component';

@Component({
  selector: 'gh-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class ProfileFormComponent implements OnInit {

  readonly WorkType = WorkType;
  readonly languagesNames = Object.values(Languages);

  readonly form = new FormGroup({
    email: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    phone: new FormControl(null),
    about: new FormControl(''),
    keywords: new FormControl([]),
    languages: new FormControl([]),
    workType: new FormControl(null),
    experience: new FormControl(null),
    hourlyRate: new FormControl(null),
  }, {updateOn: 'blur'});

  profileUser$: Observable<IUserDto> = this.profile.selectedUser$.pipe(
    isNotNil(),
    tap(user => this.form.reset(user, {emitEvent: false}))
  );

  _disabled = true;
  @Input() set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  constructor(private readonly profile: ProfileService,
              private readonly errors: ErrorService,
              private readonly destroy$: TuiDestroyService,) {
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        skip(1),
        switchMap(() => this.profile.selectedUser$.pipe(take(1))),
        switchMap(user => {
          const patch = this.form.value;
          patch.phone = patch.phone || null;

          if (this.form.valid) {
            return this.profile.update(this.form.value).pipe(
              catchError(() => {
                this.errors.showErrorNotification();
                this.form.reset(user, {emitEvent: false});
                return of(user);
              })
            );
          } else {
            return of(user);
          }
        }),
        takeUntil(this.destroy$),
      ).subscribe({error: () => this.errors.showErrorNotification()});
  }

  onProfileInfoChange(change: IProfileInfoChangeEvent): void {
    const [firstName, lastName] = change.name.split(' ');
    this.form.patchValue({firstName, lastName, email: change.email, hourlyRate: change.hourlyRate});
  }

}
