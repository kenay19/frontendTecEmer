import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  direccion: String[] = ['/vendedor', '/donador', '/solicitante'];

  constructor(
    private router: Router,
    private crud: AuthenticateService,
    private alertController: AlertController,
  ) {}

  ngOnInit() {}

  cambiopagina() {
    this.router.navigate(['/register','login']);
  }

  loginUser(email, contrasena) {
    this.crud.loginUser(email.value, contrasena.value).subscribe((data) => {
      console.log(data);
      if (data.hasOwnProperty('error')) {
        this.crearAlerta(data['error'], email, contrasena);
        return;
      } 
      if (data[0].hasOwnProperty('idUsuario')) {
        localStorage.setItem("Usuario",JSON.stringify(data[0]))
        this.crud.setUser(data[0]);
        this.router.navigate([this.direccion[data[0]['idRol'] - 1]]);
      }
    });
  }

  HomeReturn() {
    this.router.navigate(['/']);
  }

  async crearAlerta(message, email, password) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: [
        {
          text: 'Reintentar',
          handler: () => {
            (email.value = ''), (password.value = '');
          },
        },
        {
          text: 'registrarse',
          handler: () => {
            this.cambiopagina();
          },
        },
      ],
    });
    alert.present();
    return;
  }
}
