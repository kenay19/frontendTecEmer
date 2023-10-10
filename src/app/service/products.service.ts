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
}
