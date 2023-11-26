import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MedictoolsService {

  constructor(private crud:HttpClient) { }

  guardar(nombre, descripcion, costo, idVendedor,imagenes) {
    return this.crud.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/register', {nombre, descripcion, costo, idVendedor,imagenes})
  }
}
