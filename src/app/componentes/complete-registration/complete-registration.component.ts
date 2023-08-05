import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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
  completeRegistration() {
    const { name, email, cpf, password } = this.state;
    const emailObj = {
      email
    }
    const accountObj = {
      name, 
      email,
      cpf, 
      password
    }
    this.bankService.createAccount(accountObj).subscribe({
      next: () => {
        this.bankService.sendCodeSMS(JSON.stringify(emailObj)).subscribe({
          next: ((res: CodeResponse) => {
            if (res) {
              this.router.navigate(['/']);
            }
          }),
          error: ((error: HttpErrorResponse) => {
            console.log(error)
          })
        });
      },
      error: ((err: HttpErrorResponse) => {
        console.error(err)
      })
    })
  }
} 
