import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-identity-verification',
  templateUrl: './identity-verification.component.html',
  styleUrls: ['./identity-verification.component.scss']
})
export class IdentityVerificationComponent {
  @ViewChild('video', { static: true }) videoElement!: ElementRef;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  capturedImage!: string;
  
  videoWidth = 0;
  videoHeight = 0;

  constraints = {
    video: {
      facingMode: "user",
      width: { ideal: 4096 },
      height: { ideal: 2160 } 
    }
  };

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { 
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }

  handleError(error: any) {
    console.log('Error: ', error);
  }

  attachVideo(stream: any) {
    this.videoElement.nativeElement.srcObject = stream;
    this.videoElement.nativeElement.play();
    this.videoElement.nativeElement.onplay = (event: any) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    };
  }

  capture() {
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0, this.videoWidth, this.videoHeight);
    let imgData = this.canvas.nativeElement.toDataURL("image/png");
    this.capturedImage = imgData;
    console.log(imgData);
  }
}
