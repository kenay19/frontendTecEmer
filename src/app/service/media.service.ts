import { Injectable } from '@angular/core';
import { Camera , CameraResultType, CameraSource} from '@capacitor/camera';


@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor() { }

  async takePicture() {
    const image = await Camera['getPhoto']({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    return image.webPath;
  }
}