import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { MedictoolsService } from '../../service/medictools.service';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
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
    private elementRef: ElementRef,
    private alertController:AlertController,
    private router: Router
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
      this.stopVideo();
      console.log(this.imagenes)
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
        this.crud.getUser().idUsuario,
        this.imagenes
      )
      .subscribe((data) => {
        if (!data.hasOwnProperty('message')) {
           this.alerta({header:'error',message:'no se pudo agregar correctamente'},nombre,descripcion,costo)
        }else{
          this.alerta({header:'exito',message:data['message']},nombre,descripcion,costo)
        }
      });
  }


  async alerta(mensajes,nombre,descripcion,costo){
    let buttons;
    if(mensajes.header === 'error'){
       buttons = [
        {
          text: 'Reintentar',
          handler: () =>{
            nombre.value = '',
            descripcion.value = ''
            costo.value = ''
            this.imagenes = []
          }
        }
      ]
    }else{
       buttons = [
        {
          text: 'Agregar Otro',
          handler: () =>{
            nombre.value = '',
            descripcion.value = ''
            costo.value = ''
            this.imagenes = []
          }
        }
      ]
    }
    
    const alerta = await this.alertController.create({
      header : mensajes.header,
      message: mensajes.message,
      buttons: buttons
    });
    alerta.present();
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
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    if (this.capturingFrames) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Obtener la matriz de píxeles del fotograma
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

     
      this.imagenes.push({matriz: imageData.data, width: imageData.width, height: imageData.height});
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }

  
}
