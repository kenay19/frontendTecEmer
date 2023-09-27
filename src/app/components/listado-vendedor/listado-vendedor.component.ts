import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-vendedor',
  templateUrl: './listado-vendedor.component.html',
  styleUrls: ['./listado-vendedor.component.scss'],
})
export class ListadoVendedorComponent  implements OnInit {

  data !: Object[];
  estados: any[] = [{name: 'En venta', function:this.sortVenta},{name: 'Listado', function:this.sortListados }];

  constructor() { }

  ngOnInit() {}

  sortVenta(){
    console.log('venta');
  }

  sortListados(){
    console.log('listado');
  }

}
