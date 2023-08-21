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
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.scss']
})
export class CodeVerificationComponent {
  public codeVerificationForm!: FormGroup;
  private subscription!: Subscription;
  private state!: Register;
  public isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bankingService: BankingService,
    private store: Store,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.createForm();
    this.subscribeToRegistrationData();
  }

  createForm(): void {
    this.codeVerificationForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }

  public selectRegistrationData(): Observable<RegisterState> {
    return this.store.select(selectRegistrationDataValues);
  }

  public handleRegistrationData(res: RegisterState): void {
    this.state = res.registrationData;
  }

  public subscribeToRegistrationData(): void {
    this.subscription = this.selectRegistrationData().subscribe({
      next: (res: RegisterState) => this.handleRegistrationData(res),
      error: (error) => console.log(error),
    });
  }

  public validateForm(): boolean {
    return this.codeVerificationForm.valid;
  }

  public buildVerificationCode(code: string): string {
    const verificationCode = {
      email: this.state.email,
      code
    };
    return JSON.stringify(verificationCode);
  }

  public verifyCodeSMS(verificationCode: string): Observable<CodeResponse> {
    return this.bankingService.codeVerificationSMS(verificationCode);
  }

  public navigateToCompleteRegistration(): void {
    this.router.navigate(['/complete-registration']);
  }

  public handleError(error: string): void {
    this.notificationService.showError(error);
  }

  public onSubmit(): void {
    if (this.validateForm()) {
      this.isLoading = true;
      const { code } = this.codeVerificationForm.value;
      const verificationCode = this.buildVerificationCode(code);
      this.subscription = this.verifyCodeSMS(verificationCode).subscribe({
        next: () => {
          this.navigateToCompleteRegistration();
        },
        error: (error: string) => {
          this.handleError(error);
          this.isLoading = false;
        }});
    } else {
      // Tratar erros de validação.
      return;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
