import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-listado-vendedor',
  templateUrl: './listado-vendedor.component.html',
  styleUrls: ['./listado-vendedor.component.scss'],
})
export class ListadoVendedorComponent  implements OnInit {

  datos : any[] = [];
  estados: any[] = [{name: 'En venta', function:this.sortVenta},{name: 'Listado', function:this.sortListados }];

  constructor(private products:ProductsService, private auth:AuthenticateService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    const {idUsuario} = this.auth.getUser(); 
     this.products.getProducts(idUsuario).subscribe((productos) => {
      for(let i  = 0; i < Object.keys(productos).length; i++) {
        this.datos.push(productos[i])
      }
    })
  }
  sortVenta(){
    console.log('venta');
  }

  sortListados(){
    console.log('listado');
  }

}
