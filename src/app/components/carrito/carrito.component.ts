import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent  implements OnInit {

  datos !: any[ ]  
  constructor() { }

  ngOnInit() {
    this.datos = JSON.parse(localStorage.getItem('carrito')).productos
    console.log(this.datos)
  }

}
