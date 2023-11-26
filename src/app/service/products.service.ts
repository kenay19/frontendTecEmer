import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private product : HttpClient) { }

  getProductsids(idVendedor){
    return this.product.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProductsIds',{idVendedor})
  }

  getProducts(idVendedor){
    return this.product.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProducts',{idVendedor})
  }

  getProduct(idProduct){
    return this.product.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProduct',{idProduct})

  }

  getImageProducts(idImagen){
    return this.product.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getImageProducts',idImagen,{ responseType: 'blob' })
  }

  updateProduct(datos){
    return this.product.put('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/updateProduct',datos);
  }

  deleteProduct(idEquipoMedico){
    return this.product.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/deleteProduct',{idEquipoMedico})
  }

  getProductsDonador(){
    return this.product.get('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProductsDonador');
  }

  findProduct(producto){
    return this.product.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/findProduct',[producto])
  }

  getCoordenates(idVendedor){
    return this.product.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getCoordenates',{idVendedor})
  }

  compraVenta(idEquipoMedico,idUsuario){
    return this.product.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/compraVenta',{idEquipoMedico,idUsuario});
  }

  getProductsSolicitante(){
    return this.product.get('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProductsSolicitante')
  }

  donacionAsignada(idEquipoMedico,idSolicitante){
    return this.product.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/DonacionAsignada',{idEquipoMedico,idSolicitante})
  }

  getDonacionesAsignadas(idSolicitante){
    return this.product.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getDonacionesAsignadas',{idSolicitante})
  }

  getTranscription(audioBlob){
    const header = new HttpHeaders();
    header.append('Content-Type','multipar/form-data')
    const formData = new FormData();
    formData.append('audioBlob', audioBlob, 'audio.wav');
    const options = {
      headers: header,
    }
    return this.product.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/transcribe',formData,options);
  }
}
