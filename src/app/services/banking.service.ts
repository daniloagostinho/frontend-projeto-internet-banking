import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../interfaces/register.interface';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { CodeResponse } from '../interfaces/code-response.interface';


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

  constructor(private http: HttpClient) { }

  public createAccount(accountData: Partial<Register>): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, accountData);
  }

  public codeVerificationSMS(codeSMS: string): Observable<CodeResponse> {
    return this.http.post<CodeResponse>(`${this.baseUrl}/validate/verification-code`, codeSMS, httpOptions);
  }
  
  public sendCodeSMS(email: string): Observable<CodeResponse> {
    return this.http.post<CodeResponse>(`${this.baseUrl}/send/code-verification`, email, httpOptions);
  }
}
