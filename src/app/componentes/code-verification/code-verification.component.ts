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
    this.createForm();
    this.subscribeToRegistrationData();
  }

  createForm(): void {
    this.codeVerificationForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }

  selectRegistrationData(): Observable<RegisterState> {
    return this.store.select(selectRegistrationDataValues);
  }

  handleRegistrationData(res: RegisterState): void {
    console.log('state res -->>> ', res.registrationData);
    this.state = res.registrationData;
  }

  subscribeToRegistrationData(): void {
    this.subscription = this.selectRegistrationData().subscribe({
      next: (res: RegisterState) => this.handleRegistrationData(res),
      error: (error) => console.log(error),
    });
  }

  validateForm(): boolean {
    return this.codeVerificationForm.valid;
  }

  buildVerificationCode(code: string): string {
    const verificationCode = {
      email: this.state.email,
      code
    };
    return JSON.stringify(verificationCode);
  }

  verifyCodeSMS(verificationCode: string): Observable<CodeResponse> {
    return this.bankingService.codeVerificationSMS(verificationCode);
  }

  navigateToCompleteRegistration(): void {
    this.router.navigate(['/complete-registration']);
  }

  onSubmit(): void {
    if (this.validateForm()) {
      const { code } = this.codeVerificationForm.value;
      const verificationCode = this.buildVerificationCode(code);
      this.subscription = this.verifyCodeSMS(verificationCode).subscribe({
        next: (res: CodeResponse) => {
          this.navigateToCompleteRegistration();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    } else {
      // Tratar erros de validação.
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
