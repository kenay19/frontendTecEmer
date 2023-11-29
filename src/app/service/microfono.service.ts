import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { Plugins, Capacitor } from '@capacitor/core';

const { CapacitorAudio } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class MicrofonoService {
  private audioRecorder: any;
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

  async startRecording(sampleRate: number = 48000) {
    if (!Capacitor.isPluginAvailable('CapacitorAudio')) {
      throw new Error('El plugin Capacitor Audio no está disponible en este dispositivo.');
    }

    try {
      const result = await CapacitorAudio['requestPermissions']();
      if (result.granted) {
        this.audioRecorder = await CapacitorAudio['startRecording']();
        return this.audioRecorder;
      } else {
        throw new Error('Permiso denegado para acceder al micrófono.');
      }
    } catch (error) {
      throw new Error('Error al iniciar la grabación: ' + error);
    }
  }

  async stopRecording() {
    if (this.audioRecorder) {
      try {
        const result = await CapacitorAudio['stopRecording']();
        this.audioRecorder = null;
        return result.path;
      } catch (error) {
        throw new Error('Error al detener la grabación: ' + error);
      }
    }
  }
}
