import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { ProductsService } from 'src/app/service/products.service';
@Component({
  selector: 'app-listado-vendedor',
  templateUrl: './listado-vendedor.component.html',
  styleUrls: ['./listado-vendedor.component.scss'],
})
export class ListadoVendedorComponent implements OnInit {
  datos: any[] = [];
  copyDatos: any[] = [];
  estados: any[] = [{ name: 'En venta' }, { name: 'listado' }];
  estadoSelect !: string;
  constructor(
    private products: ProductsService,
    private auth: AuthenticateService,
    private router: Router
  ) {}

  async ngOnInit() {
    const { idUsuario } = JSON.parse(localStorage.getItem('Usuario'));
    const productos = await this.products.getProducts(idUsuario).toPromise();
    for (let i = 0; i < Object.keys(productos).length; i++) {
      this.datos.push(productos[i][0]);
      for (let j = 0; j < this.datos[i]['imagenes'].length; j++) {
        try {
          const response = await this.products
            .getImageProducts(this.datos[i]['imagenes'][j][0])
            .toPromise();
          this.datos[i]['imagenes'][j][0] = URL.createObjectURL(response);
        } catch (error) {
          console.error(`Error al cargar la imagen: ${error}`);
        }
      }
    }
    this.copyDatos = this.datos;
  }

  filtrado(filtro) {
    if(this.estadoSelect === filtro ){
      this.copyDatos = this.datos;
      return
    }
    this.copyDatos = this.datos.filter((dato) => {
      return dato.estado == filtro;
    });
    this.estadoSelect = filtro;
  }

  navigateToprodcut(id) {
    this.router.navigate(['/products', id]);
  }
}
