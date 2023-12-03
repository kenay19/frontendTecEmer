import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  intentosNum!: number ;
  vectores!: any[] ;
  mediaStream: MediaStream;
  stream!: any;
  tomarFoto: boolean = true;
  capturingFrames: boolean = true;;
  estado = 'iniciando';
  mensaje = 'por favor tome una foto'
  constructor(private elementRef: ElementRef,private auth:AuthenticateService,private alert:AlertController,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.intentosNum = 0;
    this.vectores = [];
    this.capturingFrames = true;
    this.abrirCamaraConVistaPrevia();
  }

  showFoto() {
    if(this.estado == 'iniciando' || this.estado == 'imagen procesada' || this.estado == 'imagen no valida'){
      this.estado = 'procesando';
      this.mensaje = 'procesando imagen espere';
      this.tomarFoto = true;
      this.capturingFrames = true;
      this.captureFrames();
      return 
    }
    if(this.estado == 'procesando'){
      this.mensaje = 'por favor espere a que se termine de procesar la imagen'
    }
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

  stopVideo() {
    this.capturingFrames = false;
    if (this.stream) {
      // Comprueba si el stream está definido
      const tracks = this.stream.getTracks();
      
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
      canvas.width = 150;
      canvas.height = 150;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const resizedImageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      // const pixelData = await this.compressImageDataToJPEG(imageData);
      // Enviar la matriz de píxeles al backend

      try {
        const messageImage =await this.auth.cargarImagenesRegistro(resizedImageData.data).toPromise();
        if(messageImage['message']=== 'Imagen cargada correctamente'){
          const vectores = await this.auth.generateVectorCaracteristicas('registro').toPromise();
          console.log(vectores)
          if(Object.keys(vectores).length == 68 || Object.keys(vectores).length == 67){
            this.vectores.push(Object.values(vectores));
            this.intentosNum = this.vectores.length;
            this.estado = 'imagen procesada';
            this.mensaje  = 'por favor tome la siguiente foto'
            if(this.intentosNum == 3) {
              this.stopVideo()
              this.route.params.subscribe((params) => {
                if(params['origin'] == 'camera'){
                  this.router.navigate(['/registro-usuarios','camera',this.vectores]);
                  return
                }
                this.router.navigate(['/registro-usuarios','login',this.vectores]);
              })
            }
          }else{
            this.estado = 'imagen no valida';
            this.mensaje  = 'por favor vuelva a tomar la foto'
            this.crearAlerta();
          }
        }
      } catch (error) {
        console.error(error);
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  async crearAlerta() {
    const alerta = await this.alert.create({
      header: "Imagen no valida",
      buttons: [{
        text: "ok"
      }]
    })
    alerta.present()
  }

  PageReturn(){
    this.route.params.subscribe(param => {
      if (param['origin']== 'camera'){
        this.stopVideo()
      this.router.navigate(['/camera-log']);
      return
      }
      this.stopVideo()
      this.router.navigate(['/login']);
    })
      
  
  }
  
}
