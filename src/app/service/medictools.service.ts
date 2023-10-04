import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MedictoolsService {

  constructor(private crud:HttpClient) { }

  guardar(nombre, descripcion, costo, idVendedor) {
    return this.crud.post('http://localhost:3000/medictools/register', {nombre, descripcion, costo, idVendedor})
  }
}
