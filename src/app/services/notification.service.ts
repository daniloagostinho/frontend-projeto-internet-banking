import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: ToastrService) { }

  public showSucces(message: string): void {
    this.toastrService.success(message)
  }

  public showError(message: string): void {
    this.toastrService.error(message)
  }
}
