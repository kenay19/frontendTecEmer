import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  datos!: any[];
  total = 0;
  numTotal = 0;
  constructor(
    private products: ProductsService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    try {
      this.datos = JSON.parse(localStorage.getItem('carrito')).productos;
    } catch (error) {
      console.log(error);
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
      console.log(data);
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

 

  comprarProductos(producto){
    for(let i = 0 ; i < producto.length;i++){
      console.log('hola')
      this.total += parseFloat(producto[i].costo);
    }
    this.alerta(producto);
  }

  comprarProducto(equipoMedico){

    const usuario = JSON.parse(
      localStorage.getItem('Usuario')
    ).idUsuario;
    // primero cambiamos el estado del equipo en el frontend
    equipoMedico.estado = 'Comprado';
    this.products.compraVenta(equipoMedico.idEquipoMedico, usuario).subscribe((data) => {
        if (data['insertId']) {
          this.products.updateProduct(equipoMedico).subscribe((data) => {
              if (data['affectedRows'] == 1) {
                this.datos = this.datos.filter((item) => {
                  return item.idEquipoMedico != equipoMedico.idEquipoMedico;
                });
                console.log(this.datos)
                const carrito = JSON.parse(localStorage.getItem('carrito'));
                carrito.productos = this.datos
                localStorage.setItem('carrito', JSON.stringify(carrito));
              }
            })
        }
    });
  
  }
  async alerta(productos) {
    const alerta = await this.alertController.create({
      header: 'Seguro quiere realizar la compra ',
      message: 'Total a pagar: ' + this.total,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.total = 0;
              for(let i = 0; i < productos.length; i++) {
                this.comprarProducto(productos[i])
              }
                
            }
        },
        ,
      ],
    });
    alerta.present();
  }
}
