import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-formulario-solicitud',
  templateUrl: './formulario-solicitud.component.html',
  styleUrls: ['./formulario-solicitud.component.scss'],
})
export class FormularioSolicitudComponent implements OnInit {
  datos: any = [];
  copyDatos: any = [];

  constructor(private products: ProductsService) {}

  async ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('Usuario')).idUsuario;
    const idDonaciones = await this.products
      .getDonacionesAsignadas(usuario)
      .toPromise();
    console.log(idDonaciones[0].idEquipoMedicos);
    this.products.getProductsids(idDonaciones).subscribe(async (data) => {
      for (let i = 0; i < Object.keys(data).length; i++) {
        this.datos.push(data[i][0]);
        for (let j = 0; j < this.datos[i]['imagenes'].length; j++) {
          try {
            const response = await  this.products.getImageProducts(this.datos[i]['imagenes'][j][0]).toPromise();
            this.datos[i]['imagenes'][j][0] = URL.createObjectURL(response);
          } catch (error) {
            console.error(`Error al cargar la imagen: ${error}`);
          }
        }
      }
      console.log(this.datos)
      this.copyDatos = this.datos;
    });

  }
}
