import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-listado-donador',
  templateUrl: './listado-donador.component.html',
  styleUrls: ['./listado-donador.component.scss'],
})
export class ListadoDonadorComponent  implements OnInit {

  datos : any = [];
  copyDatos : any = [];
  estados: any[] = [{ name: 'En venta' }];
  filtroSelected !: string 
  constructor(private products:ProductsService) { }

  ngOnInit() {
    this.cargarProductos()
  }

  async cargarProductos(){
    const productos = await this.products.getProductsDonador().toPromise();
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
    console.log(this.datos)
  }

  filtrado(filtro){
    if(this.filtroSelected === filtro ){
      this.copyDatos = this.datos;
      return
    }
    this.copyDatos = this.datos.filter((dato) => {
      return dato.estado == filtro;
    });
    this.filtroSelected = filtro;
  }

  async buscador(producto){
    let datos  = []
    this.products.findProduct(producto).subscribe(async productos => {
      for (let i = 0; i < Object.keys(productos).length; i++) {  
        datos.push(productos[i][0])
        for(let j = 0 ; j < datos[i]['imagenes'].length; j++) {
          this.products.getImageProducts(datos[i]['imagenes'][j][0]).subscribe(img => {
            datos[i]['imagenes'][j][0] = URL.createObjectURL(img)
          })
        }
      }  
      
      this.copyDatos=datos
    })
    
  }
}
