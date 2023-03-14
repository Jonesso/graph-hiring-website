import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DEFAULT_AVATAR_URL } from '@shared/constants';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { FormControl } from '@angular/forms';

export interface IProfileInfoChangeEvent {
  hourlyRate: number | null;
  name: string;
  email: string;
}

@Component({
  selector: 'gh-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileInfoComponent {

  @Input() avatarSrc = DEFAULT_AVATAR_URL;
  @Input() hourlyRate: number | null = null;
  @Input() name: string = '';
  @Input() email: string | null = null;
  @Input() hourlyRateFormControl: FormControl = new FormControl(null);
  @Input() nameFormControl: FormControl = new FormControl(null);
  @Input() emailFormControl: FormControl = new FormControl(null);

  _editable = false;

  @Input() set editable(val: string | boolean) {
    this._editable = typeof val === 'string' ? true : val;
  }

  @Output() readonly infoChange = new EventEmitter<IProfileInfoChangeEvent>();

  constructor(@Inject(TuiAlertService) private readonly alertService: TuiAlertService,) {
  }

  onChange(prop: 'name' | 'email', event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    if (inputEl.value && inputEl.checkValidity()) {
      // @ts-ignore
      this[prop] = inputEl.value;
      this.infoChange.emit({
        hourlyRate: this.hourlyRate,
        name: (this.name as string).trim(),
        email: (this.email as string).trim()
      });
    } else {
      const errorText = prop === 'name'
        ? 'Write at least your first name'
        : (inputEl.value ? 'Invalid email' : 'Email is required');

      this.alertService.open(
        errorText,
        {
          label: 'Cannot save your data',
          status: TuiNotification.Warning,
          autoClose: true,
          hasCloseButton: true
        }
      ).subscribe();
    }
  }

  onRateChange(newRate: string | null): void {
    this.hourlyRate = newRate ? parseInt(newRate, 10) : null;

    this.infoChange.emit({
      hourlyRate: this.hourlyRate,
      name: (this.name as string).trim(),
      email: (this.email as string).trim()
    });
  }

}
