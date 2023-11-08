import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  user!: any;
  equipoMedico!: any;
  imagenes!: any[];
  principal!: any;
   constructor(
    private products: ProductsService,
    private route: ActivatedRoute,
    private auth: AuthenticateService,
    private alertController: AlertController,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("Usuario"))
    try {
      this.route.params.forEach((param) => {
        this.products.getProduct(param['id']).subscribe(async (product) => {
          for (let j = 0; j < product[0][0]['imagenes'].length; j++) {
            try {
              const response = await this.products
                .getImageProducts(product[0][0]['imagenes'][j][0])
                .toPromise();
              product[0][0]['imagenes'][j][0] = URL.createObjectURL(response);
            } catch (error) {
              console.error(`Error al cargar la imagen: ${error}`);
            }
          }
          this.equipoMedico = product[0]['0'];
          this.imagenes = this.equipoMedico['imagenes'];
          this.principal = this.imagenes['0'];
        });;
      
      });
    } catch (error) {
      console.log(error);
    }
  }

  changePrincipalImage(image) {
    this.principal = image;
  }



  actualizar(datos) {
    datos.idEquipoMedico = this.equipoMedico['idEquipoMedico'];
    this.products.updateProduct(datos).subscribe((product) => {
      if(product['affectedRows']==1){
        this.createAlert({header: 'Producto Actualizado Correctamente'})
      }
    });
  }

  delete(idProducto) {
    console.log(idProducto)
   this.products.deleteProduct(idProducto).subscribe((product) => {
    if(product['affectedRows']==1){
      this.createAlert({header: 'Producto Eliminado Correctamente'})
    }
   })
  }


  async createAlert(message){
    const alerta = await this.alertController.create({
      header: message.header,
      buttons: [{
        text: 'ok',
        handler: () => {
          this.router.navigate(['/vendedor'])
        }
      }]
    })
    alerta.present();
  }
}
