import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';

@Component({
  selector: 'app-camera-log',
  templateUrl: './camera-log.page.html',
  styleUrls: ['./camera-log.page.scss'],
})

/**
 * Clase para el logeo con rostro 
 */
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

  /**
   *  Inicializa la camra del dispositivo a utilizar, ademas de empezar a tomar capturas del video de la camara
   *  para mandarlas al backend, para su posterior procesamiento
   */
  ionViewWillEnter() {
    this.capturingFrames = true;
    this.abrirCamaraConVistaPrevia();
    this.captureFrames();
  }

  /**
   *  Esta funcion inicia la camara del dispositvo, y los muestra en una etiqueta para la retroalimentacion del usuario
   */
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

  /**
   * Del video generado en la funcion abrirCamaraConVistaPrevia toma capturas de pantalla, a las cuales obtiene su matriz
   * correspondiente y la manda al backend para su posterior analisis
   */
  async captureFrames() {
    const video =
      this.elementRef.nativeElement.querySelector('#camara-preview');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    while (this.capturingFrames) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Obtener la matriz de píxeles del fotograma
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

     // const pixelData = await this.compressImageDataToJPEG(imageData);
      // Enviar la matriz de píxeles al backend
      console.log(imageData);
      this.auth.loginWithFace(imageData).subscribe((data) => {
        console.log(data);
      });

      // Espera un breve período de tiempo antes de capturar el siguiente fotograma
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  /**
   * Detiene el video generado y redirrecciona al usuario a la pagina de inicio de sesion clasico (email,contrasena)
   */
  navigateToLogin() {
    this.stopVideo();
    this.router.navigate(['/login']);
  }

  /**
   * Detiene el video generado y redirrecciona al usuario a la pagina de registro de usuarios
   */
  navigateToRegisterUser() {
    this.stopVideo();
    this.router.navigate(['/registro-usuarios', 'camera']);
  }

  /**
   * De la matriz obtenida en la funcion captureFrames la vamos a comprimir para facilitar el envio de datos hacia
   * el servidor
   * @param imageData matriz de la imagen 
   * @returns un blob que contiene la matriz en formato jpeg
   */
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
/**
   * Detiene el video generado y redirrecciona al usuario a la pagina de inicio 
   */
  HomeReturn() {
    this.stopVideo();
    this.router.navigate(['/']);
  }

  /**
   * Detiene el video antes de navegar a otra pagina666
   */
  stopVideo() {
    if (this.stream) {
      // Comprueba si el stream está definido
      const tracks = this.stream.getTracks();
      this.capturingFrames = false;
      tracks.forEach((track) => {
        // Detiene cada pista del stream
        track.stop();
      });
    }
  }
}
