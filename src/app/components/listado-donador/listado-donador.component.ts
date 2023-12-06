import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { MicrofonoService } from 'src/app/service/microfono.service';
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
  shearch:boolean = true;
  imageURL : string = "/assets/producto_generico.jpg"
  cargando:boolean = false;
  valor : string = ''
  constructor(private products:ProductsService , private microfono:MicrofonoService) { }

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
    this.cargando = true;
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

  audioSearch(){
    if(this.shearch){
      this.microfono.startRecord().then((result => {
        this.microfono.chunks = []
      this.microfono.datos = ''
      this.valor = result['transcription']
      this.buscador(result['transcription'])
      }))
      this.shearch = false
      return
    }
    this.microfono.stopRecord()
    
    this.shearch = true
   

  }

  cancelar(){
    this.valor = ''
    this.copyDatos = this.datos
  }
}
