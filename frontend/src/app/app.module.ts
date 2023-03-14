import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@core/services/auth/auth.service';
import { HeaderModule } from '@modules/header/header.module';
import { FullNamePipe } from '@shared/pipes/full-name/full-name.pipe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    HttpClientModule,
    HeaderModule,
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
    {
      provide: APP_INITIALIZER,
      deps: [AuthService],
      useFactory: (auth: AuthService) => () => {
        auth.loadUser().subscribe();
      },
      multi: true
    },
    FullNamePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
