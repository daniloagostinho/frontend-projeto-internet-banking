import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { CodeVerificationComponent } from './componentes/code-verification/code-verification.component';
import { CompleteRegistrationComponent } from './componentes/complete-registration/complete-registration.component';
import { RecovertPasswordComponent } from './componentes/recover-password/recover-password.component';
import { ResetPasswordComponent } from './componentes/reset-password/reset-password.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'recover-password', component: RecovertPasswordComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
  {
    path: 'code-verification', component: CodeVerificationComponent
  },
  {
    path: 'complete-registration', component: CompleteRegistrationComponent
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
