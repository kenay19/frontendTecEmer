import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class MicrofonoService {

  stream !: any;
  mediaRecorder !: any;
  chunks !: any [];

  constructor(private products: ProductsService) {}

  async startRecord(){
    this.stream = await navigator.mediaDevices.getUserMedia({audio:true});
    this.mediaRecorder = new MediaRecorder(this.stream);
    this.chunks = [];

    this.mediaRecorder.ondataavailable = (e) =>{
      this.chunks.push(e.data);
    }

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.chunks,{type: 'audio/flac'})
      console.log(blob)
      this.products.getTranscription(blob).subscribe(data =>{
        console.log(data)
      })
    }

    this.mediaRecorder.addEventListener('stop', () => {
      if (this.mediaRecorder.state === 'inactive') {
        this.stopRecord();
      }
    });

    this.mediaRecorder.start()
  }
  stopRecord() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.stream.getTracks().forEach((track) => track.stop());
    }
  }

  
}
