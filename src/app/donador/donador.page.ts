import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donador',
  templateUrl: './donador.page.html',
  styleUrls: ['./donador.page.scss'],
})
export class DonadorPage implements OnInit {

  rutas: any[]= ['/vendedor','/donador','/solicitante']
  show:string = 'listado';
  showSelected!:string
  constructor(private router:Router) { }

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('Usuario'))
    console.log(usuario)
    if(!usuario){
      this.router.navigate(['/home'])
    }
    if(usuario.idRol !=2 ){
      this.router.navigate(this.rutas[usuario.idRol-1])
    }
  }

  changeSelected(select){
    if(select !== this.showSelected){
      this.show = select
    }
  }

  logOut(){
    //this.crud.SessionOut();
    localStorage.removeItem('Usuario')
    this.router.navigate(['/']);
  }
 
}
