import { Component } from '@angular/core';
import { BankingService } from 'src/app/services/banking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public cpf: string = '';
  public password: string = '';

  constructor(private bankService: BankingService) {}

  public submit(): void {
    const createCredentials = this.createCredentials();
    this.bankService.login(createCredentials);
  }

  public createCredentials(): any {
    return {
      cpf: this.cpf,
      password: this.password
    }
  }
}
