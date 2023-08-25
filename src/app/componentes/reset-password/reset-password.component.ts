import { Component } from '@angular/core';
import { BankingService } from 'src/app/services/banking.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  public password: string = '';
  public isLoading: boolean = false;

  constructor(private bankService: BankingService, private notificationService: NotificationService) { }


  public enviarEmailRecuperacao(): void {
    this.isLoading = true;
    // this.bankService.resetPassword(buildEmail).subscribe({
    //   next: (res: any) => {
    //     this.isLoading = false;
    //     this.notificationService.showSucces(res.message)
    //   }, 
    //   error: (error: string) => {
    //     this.handleError(error);
    //     this.isLoading = false;
    //   }
    // });
  }

  public handleError(error: string): void {
    this.notificationService.showError(error);
  }

}
