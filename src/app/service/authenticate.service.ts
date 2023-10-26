import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  user!:any ;
  constructor(private http:HttpClient) { }

  registraruser(datos){
    return this.http.post('http://localhost:3000/authentication/UsersRegisters',datos);
  }

  generateCoordenates(address){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCEQ4GIzJBOKWYcEnFd4ZZQMrTU7Uxc8kM&address={'+address+'}')
  }

  loginUser(email,contrasena){
    return this.http.post('http://localhost:3000/authentication/UsersLogin',{email, contrasena});
  }

  cargarImagenesLogin(img) {
    return this.http.post('http://localhost:3000/authentication/CargarImagenesLogin',{img});
  }

  cargarImagenesRegistro(img){
    return this.http.post('http://localhost:3000/authentication/CargarImagenesRegistro',{img});
  }

  generateVectorCaracteristicas(tipo){
    return this.http.post('http://localhost:3000/authentication/LoginWithFace',{tipo});
  }

  logueoFacial(tipo){
    return this.http.post('http://localhost:3000/authentication/LoginFacial',{tipo});
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

