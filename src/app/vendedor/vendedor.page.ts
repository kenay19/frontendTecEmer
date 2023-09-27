import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.page.html',
  styleUrls: ['./vendedor.page.scss'],
})
export class VendedorPage implements OnInit {

  nombre: string = 'Kevin Omar ';

  show: string = 'listado';
  constructor() { }

  ngOnInit() {
  }

  changeFromListado() {
    if(this.show === 'listado'){
      this.show = 'formulario'    
    }
    console.log(this.show);
  }
  changeFromFormulario() {
    if(this.show === 'formulario'){
      this.show = 'listado'    
    }
    console.log(this.show);
  }

}
