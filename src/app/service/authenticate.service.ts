import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http:HttpClient) { }

  registraruser(nombre, app, apm, telefonoFijo, celular, email, calle, inte, exte, colonia, municipio, estado, cp, idRol, contrasena){
    return this.http.post('http://localhost:3000/authenticate/UsersRegisters',{nombre, app, apm, telefonoFijo, celular, email, calle, inte, exte, colonia, municipio, estado, cp, idRol, contrasena});
  }
}

