import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CodeResponse } from 'src/app/interfaces/code-response.interface';
import { storeRegistrationData } from 'src/app/ngrx/actions/registration.actions';
import { BankingService } from 'src/app/services/banking.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private bankService: BankingService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  validateForm(): boolean {
    return this.signupForm.valid;
  }

  dispatchRegistrationData(): void {
    this.store.dispatch(storeRegistrationData({ registrationData: this.signupForm.value }));
  }

  sendCodeSMS(emailObj: string): Observable<CodeResponse> {
    return this.bankService.sendCodeSMS(emailObj);
  }

  navigateToCodeVerification(): void {
    this.router.navigate(['/code-verification']);
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.dispatchRegistrationData();
      const { email } = this.signupForm.value;
      const emailObj = {
        email
      };
      this.sendCodeSMS(JSON.stringify(emailObj)).subscribe({
        next: (res: CodeResponse) => {
          if (res) {
            this.navigateToCodeVerification();
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    } else {
      // Tratar erros de validação.
    }
  }
  
}
