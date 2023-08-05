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

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.scss']
})
export class CompleteRegistrationComponent {
  private subscription!: Subscription;
  registrationData$!: Observable<RegisterState>;
  private state!: Register;

  constructor(private store: Store, private bankService: BankingService, private router: Router) {

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

  navigateToHome(res: CodeResponse): void {
    if (res) {
        this.router.navigate(['/']);
    }
  }

  handleError(error: HttpErrorResponse): void {
    console.error(error);
  }

  completeRegistration(): void {
    const accountObj = this.createAccountObject();
    const emailObj = this.createEmailObject();

    this.bankService.createAccount(accountObj).pipe(
        switchMap(() => this.bankService.sendCodeSMS(JSON.stringify(emailObj)))
    ).subscribe({
        next: this.navigateToHome.bind(this),
        error: this.handleError.bind(this)
    });
  }
} 
