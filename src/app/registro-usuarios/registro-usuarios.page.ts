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
    this.route.params.subscribe(param => console.log(param));
   
  }

  generateCoordenadas(address){
    console.log(address)
    let cad = 'calle '+address.calle+' '+address.inte+', colonia '+address.colonia+', '+address.municipio+', '+address.estado+', '+address.cp
    console.log(cad)
    return  this.crud.generateCoordenates(cad)
  }

   validarNumero(cadena: string): boolean {
    const regex = /^(\d{10})?$/;
    return regex.test(cadena);
  }

  registrar(nombre, app, apm, telefonoFijo, celular, email, calle, inte, exte, colonia, municipio, estado, cp, idRol, contrasena,contrasenaConfirmacion) {

    if(nombre.value === '' || app.value === '' || apm.value === ''  || celular.value === '' || email.value === '' || calle.value === ''  || municipio.value === '' || estado.value === '' || cp.value === '' || idRol.value === '' || contrasena.value === '' || contrasenaConfirmacion.value ===''){
      this.alerta({header: 'Llenar formulario',message: 'Por favor rellena los datos del formulario',buttons:[
        {
          text: 'Reintentar'
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.PageReturn()
          }
        }
      ]}) 
      return
    }
    if(!this.validarNumero(telefonoFijo.value)){
      this.alerta({header: 'Telefono Fijo No Valido',message: 'Ingrese Nuevamente el Numero Fijo o Dejelo Vacio',buttons:[
        {
          text: 'Reintentar',
          handler: ()=>{
            telefonoFijo.value = '';
            
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.PageReturn()
          }
        }
      ]}) 
      return
    }
    if(!this.validarNumero(celular.value)){
      this.alerta({header: 'Celular No Valido',message: 'Ingrese Nuevamente el Celular',buttons:[
        {
          text: 'Reintentar',
          handler: ()=>{
            celular.value = '';
            
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.PageReturn()
          }
        }
      ]}) 
      return 
    }
    if(contrasena.value !== contrasenaConfirmacion.value){
      this.alerta({header: 'No Coinicen Contrasenas',message: 'Vuelve a introducir las contrasenas',buttons:[
        {
          text: 'Reintentar',
          handler: ()=>{
            contrasena.value = '';
            contrasenaConfirmacion.value = '';
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.PageReturn()
          }
        }
      ]}) 
      return
    
    }
    
    this.generateCoordenadas({calle: calle.value,inte: inte.value,colonia:colonia.value,municipio:municipio.value,estado:estado.value,cp:cp.value}).subscribe(data =>{   
      if(data['status'] ==='OK'){
        const latitud = data['results'][0].geometry.location.lat;
        const alt = data['results'][0].geometry.location.lng;  
        this.route.params.subscribe(async(params) => {
          const datos = {
            nombre: nombre.value,
            app: app.value,
            apm: apm.value,
            telefonoFijo: telefonoFijo.value,
            celular: celular.value,
            email: email.value,
            calle: calle.value,
            inte: inte.value === ''? 'S/N': inte.value,
            exte: exte.value === ''? 'S/N': exte.value,
            colonia: colonia.value,
            municipio: municipio.value,
            estado: estado.value,
            cp: cp.value,
            idRol: idRol.value,
            contrasena: contrasena.value,
            lat: latitud,
            alt,
            vector1: params[0],
            vector2: params[1],
            vector3: params[2],
          }
          this.crud.registraruser(datos).subscribe((data)=> {
            if(data['message'] === 'Usuario Registrado Correctamente'){
              this.router.navigate(['/camera-log'])
            }
          });
        })
      }else{
        this.alerta({header: 'Direccion no valida',message: 'Vuelva a ingresar la direccion',buttons:[
          {
            text: 'Reintentar',
            handler: () => {
              calle.value = '';
              inte.value = '';
              exte.value = '';
              colonia.value = '';
              municipio.value = '';
              estado.value = '';
              cp.value = '';
            }
          },
          {
            text: 'Cancelar',
            handler: () => {
              this.PageReturn()
            }
          }
        ]}) 
        return
      }
      
    })
    
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

  async alerta(data){
      const alartElement = await this.alertController.create({
        header: data.header,
        message: data.message,
        buttons: data.buttons
      });
      alartElement.present();
      return
    
  }
}
