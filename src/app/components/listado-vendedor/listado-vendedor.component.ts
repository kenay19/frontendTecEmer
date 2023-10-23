import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { ProductsService } from 'src/app/service/products.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-listado-vendedor',
  templateUrl: './listado-vendedor.component.html',
  styleUrls: ['./listado-vendedor.component.scss'],
})
export class ListadoVendedorComponent implements OnInit {
  datos: any[] = [];
  estados: any[] = [
    { name: 'En venta', function: this.sortVenta },
    { name: 'Listado', function: this.sortListados },
  ];

  constructor(
    private products: ProductsService,
    private auth: AuthenticateService
  ) {}



  async ngOnInit() {
    const { idUsuario } = this.auth.getUser();
    const productos = await this.products.getProducts(idUsuario).toPromise();

    for (let i = 0; i < Object.keys(productos).length; i++) {
      this.datos.push(productos[i][0]);

      for (let j = 0; j < this.datos[i]['imagenes'].length; j++) {
        try {
          const imagen = await this.products.getImageProducts(this.datos[i]['imagenes'][j][0]).toPromise();
          this.datos[i]['imagenes'][j][0] = imagen;
        } catch (error) {
          console.error(`Error al cargar la imagen: ${error}`);
        }
      }
    }

    console.log(this.datos);
  }

  sortVenta() {
    console.log('venta');
  }

  sortListados() {
    console.log('listado');
  }
}

  

