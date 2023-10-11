import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthenticateService } from '../service/authenticate.service';

@Component({
  selector: 'app-camera-log',
  templateUrl: './camera-log.page.html',
  styleUrls: ['./camera-log.page.scss'],
})
export class CameraLogPage implements OnInit {
  imagenCapturada: string = null;
  mediaStream: MediaStream;
  capturingFrames: boolean = true;
  stream!: any;
  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private auth: AuthenticateService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.abrirCamaraConVistaPrevia();
    this.captureFrames();
  }

  async abrirCamaraConVistaPrevia() {
    const previewElement =
      this.elementRef.nativeElement.querySelector('#camara-preview');
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });

      previewElement.srcObject = this.stream;
      previewElement.play();
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
    }
  }

  async captureFrames() {
    const video =
      this.elementRef.nativeElement.querySelector('#camara-preview');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    while (this.capturingFrames) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Obtener la matriz de píxeles del fotograma
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      const pixelData = await this.compressImageDataToJPEG(imageData);
      // Enviar la matriz de píxeles al backend
      console.log(imageData);
      this.auth.loginWithFace(imageData).subscribe((data) => {
        console.log(data);
      });

      // Espera un breve período de tiempo antes de capturar el siguiente fotograma
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  navigateToLogin() {
    this.stopVideo();
    this.router.navigate(['/login']);
  }

  navigateToRegisterUser() {
    this.stopVideo();
    this.router.navigate(['/registro-usuarios', 'camera']);
  }

  ionViewWillLeave() {
    this.capturingFrames = false;

    if (this.mediaStream) {
      const tracks = this.mediaStream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }
  async compressImageDataToJPEG(imageData) {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const context = canvas.getContext('2d');
    context.putImageData(imageData, 0, 0);

    // Convierte el contenido del canvas a un Blob en formato JPEG
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg');
    });
  }

  HomeReturn() {
    this.stopVideo();
    this.router.navigate(['/']);
  }

  stopVideo() {
    if (this.stream) {
      // Comprueba si el stream está definido
      const tracks = this.stream.getTracks();

      tracks.forEach((track) => {
        // Detiene cada pista del stream
        track.stop();
      });
    }
  }
}
