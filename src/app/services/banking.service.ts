import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Register } from '../interfaces/register.interface';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { CodeResponse } from '../interfaces/code-response.interface';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class BankingService {
  
  private baseUrl = 'http://localhost:3000/user'; // Substitua por sua URL de API real

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) { }

  public createAccount(accountData: Partial<Register>): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, accountData).pipe(
      catchError(this.handleError)
    );
  }

  public codeVerificationSMS(codeSMS: string): Observable<CodeResponse> {
    return this.http.post<CodeResponse>(`${this.baseUrl}/validate/verification-code`, codeSMS, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public sendCodeSMS(email: string): Observable<CodeResponse> {
    return this.http.post<CodeResponse>(`${this.baseUrl}/send/code-verification`, email, httpOptions);
  }

  public recoverPassword(email: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/recover`, email, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public login(credentials: any): void {
    this.http.post<any>(`${this.baseUrl}/login`, credentials, httpOptions).pipe(
      catchError(this.handleError)
    ).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.notificationService.showError(error)
      }
    })
  }

  public resetPassword(token: string, newPassword: string): Observable<any> {
    const body = {
      token: token,
      password: newPassword
    };

    return this.http.post(`${this.baseUrl}/reset`, body, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error.error) {
      return throwError(error.error.error)
    }
    return throwError('Algo deu errado; por favor, tente novamente mais tarde.');
  }
}
