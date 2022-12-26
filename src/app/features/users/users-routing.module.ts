import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoPageComponent } from './pages/user-info-page/user-info-page.component';
import { MustBeLoggedInGuard } from '../auth/guards/must-be-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: UserInfoPageComponent,
    canActivate: [MustBeLoggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
