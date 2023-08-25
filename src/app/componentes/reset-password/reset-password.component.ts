import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private bankService: BankingService,
    private notificationService: NotificationService,
    private router: Router) { }

  navigateRoute(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  public enviarEmailRecuperacao(): void {
    this.isLoading = true;
    const token = localStorage.getItem('resetPasswordToken');

    if (token) {
    const resetPasswordToken = JSON.parse(token);

      const newPassword = this.password;

      this.bankService.resetPassword(resetPasswordToken, newPassword).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.notificationService.showSucces(res.message);
          this.navigateRoute('/')
        },
        error: (error: string) => {
          this.handleError(error);
          this.isLoading = false;
        }
      });
    }
  
  }

  public handleError(error: string): void {
    this.notificationService.showError(error);
  }

}
