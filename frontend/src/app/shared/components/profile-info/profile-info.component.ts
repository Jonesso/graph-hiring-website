import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AVATAR_EXTENSION, DEFAULT_AVATAR_URL } from '@shared/constants';
import { TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { FormControl } from '@angular/forms';
import { Observer, of, Subject, switchMap } from 'rxjs';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiFileLike } from '@taiga-ui/kit';
import { ErrorService } from '@core/services/error.service';

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

  _uploadedAvatarDataUrl: string | null = null;

  @Output() readonly infoChange = new EventEmitter<IProfileInfoChangeEvent>();
  @Output() readonly avatarChange = new EventEmitter<Blob>();

  avatarFileControl = new FormControl();

  readonly loadedFiles$ = this.avatarFileControl.valueChanges.pipe(
    switchMap(file => {
      if (file) {
        this.convertFileToDataUrl(file);

        return of(file);
      } else {
        return of(null);
      }
    }),
  );
  readonly rejectedFiles$ = new Subject<TuiFileLike | null>();

  constructor(
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private readonly errorService: ErrorService,
  ) {
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

  convertFileToDataUrl(file: File | undefined): void {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this._uploadedAvatarDataUrl = reader.result as string;
      };
      reader.onerror = () => this.errorService.showErrorNotification('Something went wrong while processing the file');
    }
  }

  onAvatarCrop(croppedCanvas: HTMLCanvasElement, observer: Observer<unknown>): void {
    croppedCanvas.toBlob(blob => {
      if (!blob) {
        this.errorService.showErrorNotification();
        return;
      }

      this.avatarChange.emit(blob);
      this.closeDialog(observer);
    }, `image/${AVATAR_EXTENSION}`, .75);

    this.avatarSrc = croppedCanvas.toDataURL(`image/${AVATAR_EXTENSION}`);
  }

  openUploadAvatarDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogService.open(content, {
      label: 'Upload avatar',
      dismissible: false,
      size: 'l',
    }).subscribe();
  }

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles$.next(file as TuiFileLike);
  }

  clearRejected(): void {
    this.removeFile();
    this.rejectedFiles$.next(null);
  }

  removeFile(): void {
    this.avatarFileControl.setValue(null);
  }

  closeDialog(observer: Observer<unknown>): void {
    this._uploadedAvatarDataUrl = null;
    this.removeFile();
    observer.complete();
  }
}
