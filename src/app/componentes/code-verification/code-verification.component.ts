import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterResponse } from 'src/app/interfaces/register-response.interface';
import { selectRegistrationDataValues } from 'src/app/ngrx/selector/registration.selectors';
import { BankingService } from 'src/app/services/banking.service';
import { Store } from '@ngrx/store';
import { Register } from 'src/app/interfaces/register.interface';
import { Observable, Subscription, map } from 'rxjs';
import { RegisterState } from 'src/app/interfaces/register-state.interface';
import { CodeResponse } from 'src/app/interfaces/code-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.scss']
})
export class CodeVerificationComponent {
  codeVerificationForm!: FormGroup;
  registrationData$!: Observable<RegisterState>;
  private subscription!: Subscription;
  private state!: Register;

  constructor(
    private formBuilder: FormBuilder,
    private bankingService: BankingService,
    private store: Store,
    private router: Router) { }

  ngOnInit() {
    this.registrationData$ = this.store.select(selectRegistrationDataValues);
    this.codeVerificationForm = this.formBuilder.group({
      code: ['', Validators.required]
    });

    this.subscription = this.registrationData$
    .subscribe(
      {
        next: ((res: RegisterState) => {
          console.log('state res -->>> ', res.registrationData)
          this.state = res.registrationData;
        }),
        error: ((error) => {
          console.log(error)
        })
      }
    );
  }

  onSubmit(): void {

    if (this.codeVerificationForm.valid) {
      // Faz algo com os dados do formulário.
      const { code } = this.codeVerificationForm.value;

      console.log(typeof code)

      const verificationCode = {
        email: this.state.email,
        code
      }
      
       this.subscription = this.bankingService.codeVerificationSMS(JSON.stringify(verificationCode)).subscribe(
        {
          next: ((res: CodeResponse) => {
            this.router.navigate(['/identity-verification'])
          }),
          error: ((error: HttpErrorResponse) => {
            console.log(error)
          })
        },
      )
    } else {
      // Trata erros de validação.
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
