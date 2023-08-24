import { Component } from '@angular/core';
import { BankingService } from 'src/app/services/banking.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecovertPasswordComponent {
  public email: string = '';
  public isLoading: boolean = false;

  constructor(private bankService: BankingService, private notificationService: NotificationService) { }

  public enviarEmailRecuperacao(): void {
    this.isLoading = true;
    const buildEmail = this.buildEmailToSendApi();
    this.bankService.recoverPassword(buildEmail).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.notificationService.showSucces(res.message)
      }, 
      error: (error: string) => {
        this.handleError(error);
        this.isLoading = false;
      }
    });
  }

  public handleError(error: string): void {
    this.notificationService.showError(error);
  }

  public buildEmailToSendApi(): any {
    const obj = {
      email: this.email
    }
    return JSON.stringify(obj);
  }
}
