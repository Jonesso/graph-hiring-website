import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@core/services/auth/auth.service";
import {ErrorService} from "@core/services/error.service";
import {TuiDestroyService} from "@taiga-ui/cdk";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntil} from "rxjs";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";
import {EMAIL_REGEX} from "@shared/constants";

@Component({
  selector: 'gh-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.pattern(EMAIL_REGEX),
      Validators.required
    ]),
    password: new FormControl('', Validators.required)
  });

  constructor(private readonly auth: AuthService,
              private readonly errorService: ErrorService,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
              private readonly destroy$: TuiDestroyService) {
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: () => {
            this.showSuccessNotification();
            this.router.navigate(['../signin'], {relativeTo: this.route});
          },
          error: () => this.errorService.showErrorNotification()
        });
    }
  }

  showSuccessNotification() {
    this.alertService.open('Check your email for verification', {
      label: "You've been successfully registered",
      status: TuiNotification.Success,
      autoClose: true,
      hasCloseButton: true
    })
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

}
