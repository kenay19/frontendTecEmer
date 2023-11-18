import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class MicrofonoService {

  stream: any;
  mediaRecorder: any;
  chunks: any[] = [];
  datos: any = ' ';

  constructor(private products: ProductsService) {}

  async startRecord() {
    this.datos = ''
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 48000 } });
    const audioTracks = this.stream.getAudioTracks();
    
    this.mediaRecorder = new MediaRecorder(this.stream);

    return new Promise((resolve, reject) => {
      this.mediaRecorder.ondataavailable = (e) => {
        this.chunks.push(e.data);
      };

      this.mediaRecorder.onstop = async () => {
        const blob = new Blob(this.chunks, { type: 'audio/wav' });
        try {
          this.datos = await this.products.getTranscription(blob).toPromise();
          resolve(this.datos);
        } catch (error) {
          reject(error);
        }
      };

      

      this.mediaRecorder.start();
    });
  }

  async stopRecord(): Promise<any> {
    return new Promise(async (resolve) => {
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        await this.mediaRecorder.stop();
        this.stream.getTracks().forEach((track) => track.stop());
      }
      resolve(this.datos);
      
    });
  }
}
