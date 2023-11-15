import { Injectable } from '@angular/core';
import { HttpClient,HttpRequest } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private product : HttpClient) { }

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
}
