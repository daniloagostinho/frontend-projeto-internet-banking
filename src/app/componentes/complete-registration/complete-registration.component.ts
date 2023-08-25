import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, switchMap } from 'rxjs';
import { CodeResponse } from 'src/app/interfaces/code-response.interface';
import { RegisterState } from 'src/app/interfaces/register-state.interface';
import { Register } from 'src/app/interfaces/register.interface';
import { selectRegistrationDataValues } from 'src/app/ngrx/selector/registration.selectors';
import { BankingService } from 'src/app/services/banking.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.scss']
})
export class CompleteRegistrationComponent {
  private subscription!: Subscription;
  registrationData$!: Observable<RegisterState>;
  private state!: Register;

  constructor(
    private store: Store,
    private bankService: BankingService,
    private router: Router,
    private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.registrationData$ = this.store.select(selectRegistrationDataValues);

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

  createAccountObject(): any {
    const { name, email, cpf, password } = this.state;
    return { name, email, cpf, password };
  }

  createEmailObject(): any {
    return { email: this.state.email };
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  handleError(error: string): void {
    this.notificationService.showError(error);
  }

  completeRegistration(): void {
    const accountObj = this.createAccountObject();

    this.bankService.createAccount(accountObj).subscribe({
      next: () => {
        this.navigateToHome();
      },
      error: this.handleError.bind(this)
    });
  }
} 
