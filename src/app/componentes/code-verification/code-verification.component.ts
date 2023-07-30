import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterResponse } from 'src/app/interfaces/register-response.interface';
import { selectRegistrationDataValues } from 'src/app/ngrx/selector/registration.selectors';
import { BankingService } from 'src/app/services/banking.service';
import { Store } from '@ngrx/store';
import { Register } from 'src/app/interfaces/register.interface';
import { Observable, map } from 'rxjs';
import { RegisterState } from 'src/app/interfaces/register-state.interface';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.scss']
})
export class CodeVerificationComponent {
  codeVerificationForm!: FormGroup;
  registrationData$!: Observable<RegisterState>;

  constructor(
    private formBuilder: FormBuilder,
    private bankingService: BankingService,
    private store: Store) { }
  
  ngOnInit() {
    this.registrationData$ = this.store.select(selectRegistrationDataValues);
    this.codeVerificationForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.registrationData$
    .subscribe(
      {
        next: ((res: RegisterState) => {
          console.log('state res -->>> ', res.registrationData)
        }),
        error: ((error) => {
          console.log(error)
        })
      }
    );
    if (this.codeVerificationForm.valid) {
      // Faz algo com os dados do formulário.
      this.bankingService.createAccount(this.codeVerificationForm.value)
      .subscribe({
        next: ((res: RegisterResponse) => {
          console.log(res);
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
