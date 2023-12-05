import { Component, ElementRef, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';
import { AlertController } from '@ionic/angular';
declare var google;
interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  showImage: boolean = true;
  map!: any;
  user!: any;
  equipoMedico!: any;
  imagenes!: any[];
  principal!: any;
  total = 0
  constructor(
    private products: ProductsService,
    private route: ActivatedRoute,
    private auth: AuthenticateService,
    private alertController: AlertController,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.verificarUsuario(JSON.parse(localStorage.getItem('Usuario')));
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
          
          this.imagenes = this.equipoMedico['imagenes'] ;
          if(this.imagenes.length == 0) {
            this.imagenes = [['/assets/producto_generico.jpg']];
          }
          this.principal = this.imagenes['0'] || '/assets/producto_generico.jpg';
          if (this.user.idRol == 2) {
            this.loadMap(product[0]['0']);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  loadMap(equipoMedico) {
    console.log(equipoMedico.idVendedor);
    this.products.getCoordenates(equipoMedico.idVendedor).subscribe((data) => {
      console.log(data[0]);
      const mapEle = this.elementRef.nativeElement.querySelector('#map');
      // create LatLng object
      const myLatLng = {
        lat: parseFloat(data[0]['lat']),
        lng: parseFloat(data[0]['alt']),
      };
      // create map
      console.log(myLatLng);
      this.map = new google.maps.Map(mapEle, {
        center: myLatLng,
        zoom: 12,
      });

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        mapEle.classList.add('show-map');
        this.addMarker({
          position: {
            lat: parseFloat(data[0]['lat']),
            lng: parseFloat(data[0]['alt']),
          },
          title: equipoMedico.nombre
        });
      });
    });
    // create a new map by passing HTMLElement
  }



  changePrincipalImage(image) {
    this.showImage = true
    this.principal = image;
  }

  agregarCarrito(producto) {
    console.log(producto);
    try {
      producto.estado = 'En carrito';
      if (!localStorage.getItem('carrito')) {
        localStorage.setItem(
          'carrito',
          JSON.stringify({ idUsuario: this.user.idUsuario, productos: [] })
        );
      }

      let carrito = JSON.parse(localStorage.getItem('carrito'));
      console.log(carrito);
      carrito.productos.push(producto);
      console.log(carrito);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      this.products.updateProduct(producto).subscribe((data) => {
        if (data['affectedRows'] == 1) {
          this.createAlert({
            header: 'Producto agregado correctamente al carrito',
            function: () => {
              this.router.navigate(['/donador']);
            },
          });
        }
      });
    } catch (error) {
      console.log('limpiando');
      localStorage.clear();
      console.log(error);
    }
  }

  verificarUsuario(usuario) {
    if (!usuario) {
      this.router.navigate(['/home']);
      return;
    }
    this.user = usuario;
  }

  actualizar(datos) {
    datos.idEquipoMedico = this.equipoMedico['idEquipoMedico'];
    console.log(datos);
    this.products.updateProduct(datos).subscribe((product) => {
      if (product['affectedRows'] == 1) {
        this.createAlert({
          header: 'Producto Actualizado Correctamente',
          function: () => {
            this.router.navigate(['/vendedor']);
          },
        });
      }
    });
  }

  delete(idProducto) {
    console.log(idProducto);
    this.products.deleteProduct(idProducto).subscribe((product) => {
      console.log(product);
      if (product['affectedRows'] == 1) {
        this.createAlert({ header: 'Producto Eliminado Correctamente' });
      }
    });
  }

  async createAlert(message) {
    const alerta = await this.alertController.create({
      header: message.header,
      buttons: [
        {
          text: 'ok',
          handler: message.function,
        },
      ],
    });
    alerta.present();
  }

  returnPage() {
    let pages = ['/vendedor', '/donador', '/solicitante'];
    this.router.navigate([pages[this.user.idRol - 1]]);
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
    });
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
                this.router.navigate(['/donador'])
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


