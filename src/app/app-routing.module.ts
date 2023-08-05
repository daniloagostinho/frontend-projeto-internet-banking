import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { CodeVerificationComponent } from './componentes/code-verification/code-verification.component';
import { IdentityVerificationComponent } from './componentes/identity-verification/identity-verification.component';
import { CompleteRegistrationComponent } from './componentes/complete-registration/complete-registration.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  { 
    path: 'signup', component: SignupComponent
  },
  {
    path: 'code-verification', component: CodeVerificationComponent
  },
  {
    path: 'complete-registration', component: CompleteRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
