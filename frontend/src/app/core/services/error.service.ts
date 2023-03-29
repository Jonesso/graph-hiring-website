import { Inject, Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(@Inject(TuiAlertService) private readonly alertService: TuiAlertService,) {
  }

  showErrorNotification(errorText: string = 'Something went wrong'): void {
    this.alertService.open(errorText, {
      label: 'Error',
      status: TuiNotification.Error,
      autoClose: true,
      hasCloseButton: true
    }).subscribe();
  }
}
