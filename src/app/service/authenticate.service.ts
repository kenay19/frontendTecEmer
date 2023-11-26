import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  user !: any

  constructor(private http:HttpClient ) {
    this.user = {}
   }

  registraruser(datos){
    return this.http.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/authentication/UsersRegisters',datos);
  }

  generateCoordenates(address){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCEQ4GIzJBOKWYcEnFd4ZZQMrTU7Uxc8kM&address={'+address+'}')
  }

  loginUser(email,contrasena){
    return this.http.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/authentication/UsersLogin',{email, contrasena});
  }

  cargarImagenesLogin(img) {
    return this.http.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/authentication/CargarImagenesLogin',{img});
  }

  cargarImagenesRegistro(img){
    return this.http.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/authentication/CargarImagenesRegistro',{img});
  }

  generateVectorCaracteristicas(tipo){
    return this.http.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/authentication/LoginWithFace',{tipo});
  }

  logueoFacial(tipo){
    return this.http.post('https://saludonlinehub-4215a7ac39d8.herokuapp.com/authentication/LoginFacial',{tipo});
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

