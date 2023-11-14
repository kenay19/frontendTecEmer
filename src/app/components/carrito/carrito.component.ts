import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  datos!: any[];
  constructor(private products: ProductsService) {}

  ngOnInit() {
    try {
      this.datos = JSON.parse(localStorage.getItem('carrito')).productos
      
    } catch (error) {
      console.log(error)
    }
    console.log(this.datos);
  }

  eliminar(id) {
    let dato = this.datos.filter((item) => {
      return item.idEquipoMedico == id;
    });
    dato[0]['estado'] = 'En venta';
    console.log(dato);
    this.products.updateProduct(dato[0]).subscribe((data) => {
      console.log(data)
      if (data['affectedRows'] == 1) {
        this.datos = this.datos.filter((item) => {
          return item.idEquipoMedico !== id;
        });
        let newcarrito = JSON.parse(localStorage.getItem('carrito'));
        newcarrito.productos = this.datos;
        localStorage.setItem('carrito', JSON.stringify(newcarrito));
      }
    });
    console.log(localStorage.getItem('carrito'));
  }
}
