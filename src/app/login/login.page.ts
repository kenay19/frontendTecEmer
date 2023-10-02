import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  direccion: String[] = ['/vendedor']

  constructor(private router:Router,private crud:AuthenticateService) { }


  ngOnInit() {
  }

  cambiopagina(){
      this.router.navigate(['/registro-usuarios']);
  }

  loginUser(email,contrasena) {
    this.crud.loginUser(email.value,contrasena.value).subscribe(data => {
      if(data[0].hasOwnProperty('idUsuario') ){
        this.crud.setUser(data[0])
        this.router.navigate([this.direccion[data[0]['idRol']-1]])
      }
    });
  }

}
