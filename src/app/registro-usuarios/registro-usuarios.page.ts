import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '../service/authenticate.service'
@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.page.html',
  styleUrls: ['./registro-usuarios.page.scss'],
})
export class RegistroUsuariosPage implements OnInit {

  constructor(private crud:AuthenticateService) { }

  ngOnInit() {
  }

  registrar(nombre, app, apm, telefonoFijo, celular, email, calle, inte, exte, colonia, municipio, estado, cp, idRol, contrasena) {
    this.crud.registraruser(nombre.value, app.value, apm.value, telefonoFijo.value, celular.value, email.value, calle.value, inte.value, exte.value, colonia.value, municipio.value, estado.value, cp.value, idRol.value, contrasena.value).subscribe((data)=> {console.log(data)})
  }
}
