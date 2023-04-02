import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import { takeUntil } from 'rxjs';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { ErrorService } from '@core/services/error.service';
import { EMAIL_REGEX } from '@shared/constants';
import { HeaderService } from '@modules/header/header.service';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'gh-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TuiDestroyService,
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This value is required',
        pattern: 'Must be a valid email',
      },
    },
  ]
})
export class SignInComponent {
  signInForm = new FormGroup({
    email: new FormControl('', [
      Validators.pattern(EMAIL_REGEX),
      Validators.required
    ]),
    password: new FormControl('', Validators.required)
  });

  constructor(private readonly auth: AuthService,
              private readonly header: HeaderService,
              private readonly errorService: ErrorService,
              private readonly destroy$: TuiDestroyService) {
    header.setTitle('Sign in');
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.auth.signIn(this.signInForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          error: err => this.errorService.showErrorNotification(err.error?.message || 'Unable to sign you in right now. Try again several minutes later.')
        });
    }
  }

}
