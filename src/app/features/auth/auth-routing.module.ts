import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustBeLoggedOutGuard } from './guards/must-be-logged-out.guard';
import { LoginComponent } from './pages/login/login.component';
import { routeConfig } from 'src/app/route-config';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: routeConfig.auth.login,
    pathMatch: 'full'
  },
  {
    path: routeConfig.auth.login,
    component: LoginComponent,
    canActivate: [MustBeLoggedOutGuard]
  },
  {
    path: routeConfig.auth.confirmEmail,
    component: ConfirmEmailComponent,
    canActivate: [MustBeLoggedOutGuard]
  },
  {
    path: routeConfig.auth.resetPassword,
    component: ResetPasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
