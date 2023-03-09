import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "@modules/auth/sign-in/sign-in.component";
import {SignUpComponent} from "@modules/auth/sign-up/sign-up.component";
import {SignInGuard} from "@core/guards/sign-in.guard";


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
      },
      {
        path: 'signin',
        component: SignInComponent,
        canActivate: [SignInGuard]
      },
      {
        path: 'signup',
        component: SignUpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
