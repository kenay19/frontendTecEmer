import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private product : HttpClient) { }

  getProductsids(idVendedor){
    return this.product.post('http://localhost:3000/medictools/getProductsIds',{idVendedor})
  }

  getProducts(idVendedor){
    return this.product.post('http://localhost:3000/medictools/getProducts',{idVendedor})
  }

  getProduct(idProduct){
    return this.product.post('http://localhost:3000/medictools/getProduct',{idProduct})

  }

  getImageProducts(idImagen){
    return this.product.post('http://localhost:3000/medictools/getImageProducts',idImagen,{ responseType: 'blob' })
  }

  updateProduct(datos){
    return this.product.put('http://localhost:3000/medictools/updateProduct',datos);
  }

  deleteProduct(idEquipoMedico){
    return this.product.post('http://localhost:3000/medictools/deleteProduct',{idEquipoMedico})
  }

  getProductsDonador(){
    return this.product.get('http://localhost:3000/medictools/getProductsDonador');
  }

  findProduct(producto){
    return this.product.post('http://localhost:3000/medictools/findProduct',[producto])
  }

  getCoordenates(idVendedor){
    return this.product.post('http://localhost:3000/medictools/getCoordenates',{idVendedor})
  }

  compraVenta(idEquipoMedico,idUsuario){
    return this.product.post('http://localhost:3000/medictools/compraVenta',{idEquipoMedico,idUsuario});
  }

  getProductsSolicitante(){
    return this.product.get('http://localhost:3000/medictools/getProductsSolicitante')
  }

  donacionAsignada(idEquipoMedico,idSolicitante){
    return this.product.post('http://localhost:3000/medictools/DonacionAsignada',{idEquipoMedico,idSolicitante})
  }

  getDonacionesAsignadas(idSolicitante){
    return this.product.post('http://localhost:3000/medictools/getDonacionesAsignadas',{idSolicitante})
  }

  getTranscription(audioBlob){
    const header = new HttpHeaders();
    header.append('Content-Type','multipar/form-data')
    const formData = new FormData();
    formData.append('audioBlob', audioBlob, 'audio.wav');
    const options = {
      headers: header,
    }
    return this.product.post('http://localhost:3000/medictools/transcribe',formData,options);
  }
}
