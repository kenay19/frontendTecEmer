import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.page.html',
  styleUrls: ['./vendedor.page.scss'],
})
export class VendedorPage implements OnInit {

  nombre!: string ;
  user !: any;
  show: string = 'listado';
  constructor(private crud:AuthenticateService , private router:Router) { }

equipos !: any;

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.user = this.crud.getUser();
    if(this.user){
      if(this.user['idRol'] !== 1){
        this.router.navigate(['/'])
      }
    }else{
      this.router.navigate(['/'])
    }
    this.nombre =this.user.nombre
    
  }

  changeFromListado() {
    if(this.show === 'listado'){
      this.show = 'formulario'    
    }
  }
  changeFromFormulario() {
    if(this.show === 'formulario'){
      this.show = 'listado'    
    }
  }

  logOut(){
    this.crud.SessionOut();
    this.router.navigate(['/']);
  }

}
