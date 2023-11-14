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
    this.datos = JSON.parse(localStorage.getItem('carrito')).productos
    console.log(this.datos);
  }

  eliminar(id) {
    let dato = this.datos.filter((item) => {
      console.log(item)
      return item.idEquipoMedico == id;
    });
    dato[0].estado = 'En venta';
    this.products.updateProduct(dato).subscribe((data) => {
      if (data['affectedRows'] == 1) {
        this.datos = this.datos.filter((item) => {
          return item.idEquipoMedico !== id;
        });
        let newcarrito = JSON.parse(localStorage.getItem('carrito'));
        newcarrito.productos = this.datos;
        localStorage.setItem('carrito', JSON.stringify(newcarrito));
      }
    });
  }
}
