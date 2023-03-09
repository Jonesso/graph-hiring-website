import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from "@modules/auth/auth-routing.module";
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule, TuiIslandModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiButtonModule, TuiErrorModule, TuiLinkModule} from "@taiga-ui/core";

const TUI_MODULES = [
  TuiIslandModule,
  TuiInputModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiInputPasswordModule,
  TuiButtonModule,
  TuiLinkModule,
];

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TUI_MODULES,
  ],
})
export class AuthModule {
}
