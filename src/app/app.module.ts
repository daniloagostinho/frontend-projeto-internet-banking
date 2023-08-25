import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CodeVerificationComponent } from './componentes/code-verification/code-verification.component';
import { StoreModule } from '@ngrx/store';
import { registrationReducer } from './ngrx/reducers/registration.reducer';
import { IdentityVerificationComponent } from './componentes/identity-verification/identity-verification.component';
import { CompleteRegistrationComponent } from './componentes/complete-registration/complete-registration.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecovertPasswordComponent } from './componentes/recover-password/recover-password.component';
import { ResetPasswordComponent } from './componentes/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    CodeVerificationComponent,
    IdentityVerificationComponent,
    CompleteRegistrationComponent,
    RecovertPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ registrationData: registrationReducer }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
