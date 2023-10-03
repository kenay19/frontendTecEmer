import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  user!:any ;
  constructor(private http:HttpClient) { }

  registraruser(nombre, app, apm, telefonoFijo, celular, email, calle, inte, exte, colonia, municipio, estado, cp, idRol, contrasena){
    console.log({nombre, app, apm, telefonoFijo, celular, email, calle, inte, exte, colonia, municipio, estado, cp, idRol, contrasena})
    return this.http.post('http://localhost:3000/authentication/UsersRegisters',{nombre, app, apm, telefonoFijo, celular, email, calle, inte, exte, colonia, municipio, estado, cp, idRol, contrasena});
  }

  loginUser(email,contrasena){
    return this.http.post('http://localhost:3000/authentication/UsersLogin',{email, contrasena});
  }

  getUser(){
    return this.user;
  }

  setUser(user){
    this.user = user;
  }

  SessionOut(){
    this.user = null;
  }
}

