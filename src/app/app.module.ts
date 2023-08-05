import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CodeVerificationComponent } from './componentes/code-verification/code-verification.component';
import { StoreModule } from '@ngrx/store';
import { registrationReducer } from './ngrx/reducers/registration.reducer';
import { IdentityVerificationComponent } from './componentes/identity-verification/identity-verification.component';
import { CompleteRegistrationComponent } from './componentes/complete-registration/complete-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    CodeVerificationComponent,
    IdentityVerificationComponent,
    CompleteRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ registrationData: registrationReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
