import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '../service/authenticate.service'
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.page.html',
  styleUrls: ['./registro-usuarios.page.scss'],
})
export class RegistroUsuariosPage implements OnInit {

  constructor(private crud:AuthenticateService, private router: Router,private route: ActivatedRoute, private alertController:AlertController) { }

  ngOnInit() {
  }

  registrar(nombre, app, apm, telefonoFijo, celular, email, calle, inte, exte, colonia, municipio, estado, cp, idRol, contrasena) {
    if(nombre.value === '' || app.value === '' || apm.value === ''  || celular.value === '' || email.value === '' || calle.value === '' || inte.value === ''  || colonia.value === '' || municipio.value === '' || estado.value === '' || cp.value === '' || idRol.value === '' || contrasena.value === ''){
      this.alerta(nombre, app, apm, telefonoFijo, celular, email, calle, inte, exte, colonia, municipio, estado, cp, idRol, contrasena) 
      return
    }
    this.crud.registraruser(nombre.value, app.value, apm.value, telefonoFijo.value, celular.value, email.value, calle.value, inte.value, exte.value, colonia.value, municipio.value, estado.value, cp.value, idRol.value, contrasena.value).subscribe((data)=> {
      if(data.hasOwnProperty('message')){
        this.router.navigate(['/login']);
      }else{
        // dejamos para despues la parte en la que mande error el mysql
      }
    });
  }

  PageReturn(){
    this.route.params.subscribe((params) => {
      if(params['rutaProcedente'] == 'camera'){
        this.router.navigate(['/camera-log']);
        return
      }
      this.router.navigate(['/login']);
    })
  }

  async alerta(nombre, app, apm, telefonoFijo, celular, email, calle, inte, exte, colonia, municipio, estado, cp, idRol, contrasena){
      const alartElement = await this.alertController.create({
        header: 'Llenar formulario',
        message: 'Rellena todos los campos obligatorios del formulario',
        buttons:[
          {
            text: 'Reintentar',
            handler: () =>{
              nombre.values = '' 
              app.value =''
              apm.value =''
              telefonoFijo.value =''
              celular.value =''
              email.value =''
              calle.value =''
              inte.value =''
              exte.value =''
              colonia.value =''
              municipio.value =''
              estado.value =''
              cp.value =''
              idRol.value =''
              contrasena.value =''
            }
          },
          {
            text: 'Cancelar',
            handler: () => {
              this.PageReturn()
            }
          }
        ]
      });
      alartElement.present();
      return
    
  }
}
