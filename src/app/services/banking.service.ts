import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../interfaces/register.interface';
import { RegisterResponse } from '../interfaces/register-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

  private baseUrl = 'http://localhost:3000/user'; // Substitua por sua URL de API real

  constructor(private http: HttpClient) { }

  public createAccount(accountData: Register): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, accountData);
  }
  
}
