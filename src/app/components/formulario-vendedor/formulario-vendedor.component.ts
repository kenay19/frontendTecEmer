import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { MedictoolsService } from '../../service/medictools.service';
import { AuthenticateService } from 'src/app/service/authenticate.service';
@Component({
  selector: 'app-formulario-vendedor',
  templateUrl: './formulario-vendedor.component.html',
  styleUrls: ['./formulario-vendedor.component.scss'],
})
export class FormularioVendedorComponent implements OnInit {
  @ViewChild('archivoInput') archivoInput: ElementRef;
  constructor(
    private medictools: MedictoolsService,
    private crud: AuthenticateService,
    private elementRef: ElementRef
  ) {}
  imagenes: any[] = [];
  mediaStream: MediaStream;
  stream!: any;
  tomarFoto: boolean = true;
  capturingFrames: boolean = true;
  ngOnInit() {}

  showFoto() {
    if (this.tomarFoto) {
      this.tomarFoto = false;
      this.abrirCamaraConVistaPrevia();
    } else {
      this.tomarFoto = true;
      this.capturingFrames = true;
      this.captureFrames();
      console.log(this.imagenes);
      this.stopVideo();
    }
  }

  cargarImagen() {
    console.log(this.archivoInput);
    const input: HTMLInputElement = this.archivoInput.nativeElement;
    console.log(input);
    const file: File = input.files[0];

    if (file) {
      console.log('Nombre del archivo:', file.name);
      console.log('Tipo de archivo:', file.type);
      console.log('Tamaño del archivo (en bytes):', file.size);
    } else {
      console.log('Ningún archivo seleccionado.');
    }
  }

  guardar(nombre, descripcion, costo) {
    this.medictools
      .guardar(
        nombre.value,
        descripcion.value,
        costo.value,
        this.crud.getUser().idUsuario
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  async abrirCamaraConVistaPrevia() {
    const previewElement =
      this.elementRef.nativeElement.querySelector('#video');
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });

      previewElement.srcObject = this.stream;
      previewElement.play();
    } catch (err) {
      console.error('Error al acceder a la cámara:', err);
    }
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

  /**
   * Del video generado en la funcion abrirCamaraConVistaPrevia toma capturas de pantalla, a las cuales obtiene su matriz
   * correspondiente y la manda al backend para su posterior analisis
   */
  async captureFrames() {
    const video = this.elementRef.nativeElement.querySelector('#video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (this.capturingFrames) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Obtener la matriz de píxeles del fotograma
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      this.imagenes.push(imageData);
      // const pixelData = await this.compressImageDataToJPEG(imageData);
      // Enviar la matriz de píxeles al backend

      // Espera un breve período de tiempo antes de capturar el siguiente fotograma
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }
}
