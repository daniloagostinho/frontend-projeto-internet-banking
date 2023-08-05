import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      // Faz algo com os dados do formulário.
      this.store.dispatch(storeRegistrationData({ registrationData: this.signupForm.value }));
      const { email } = this.signupForm.value;
      const emailObj = {
        email
      }
      this.bankService.sendCodeSMS(JSON.stringify(emailObj)).subscribe({
        next: ((res: CodeResponse) => {
          if (res) {
            this.router.navigate(['/code-verification']);
          }
        }),
        error: ((error: HttpErrorResponse) => {
          console.log(error)
        })
      });
    } else {
      // Trata erros de validação.
    }
  }
}
