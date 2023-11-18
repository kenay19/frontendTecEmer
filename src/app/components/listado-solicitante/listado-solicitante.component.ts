import { Component, ElementRef, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MicrofonoService } from 'src/app/service/microfono.service';
import { ProductsService } from 'src/app/service/products.service';
declare var google;
interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
}
@Component({
  selector: 'app-listado-solicitante',
  templateUrl: './listado-solicitante.component.html',
  styleUrls: ['./listado-solicitante.component.scss'],
})
export class ListadoSolicitanteComponent implements OnInit {
  datos: any[] = [];
  copyDatos!: any[];
  showMap: boolean = false;
  busqueda!: string;
  map = null;
  mensaje : string = 'mostrar mapa'
  
  shearch:boolean = true;
  constructor(
    private products: ProductsService,
    private elementRef: ElementRef,
    private alertController: AlertController,
    private microfono:MicrofonoService
  ) {}

  async ngOnInit() {
    const productos = await this.products.getProductsSolicitante().toPromise();
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
    console.log(this.datos);
    this.copyDatos = this.datos;
  }

  solicitar(id) {
    const equipoMedico = this.datos.filter(item => {return item.idEquipoMedico === id[0] && item.idVendedor == id[1]})
    this.alerta(equipoMedico[0]); 
  }

  cancelar(busqueda){
    this.copyDatos = this.datos;
    busqueda.value = '';
    this.mensaje = 'mostrar mapa';
    this.showMap = false;
  }

  changeView(busqueda){
    this.buscar(busqueda)
    if(this.mensaje === 'mostrar mapa'){
      this.mensaje = 'mostrar datos'
      this.showMap = true;
      return
    }
    this.mensaje = 'mostrar mapa';
    this.showMap = false;
  }

  buscar(nombre) {
    
    this.busqueda = nombre;

    let usuario = JSON.parse(localStorage.getItem('Usuario')).idUsuario;
    let coordenadas = [];
    let idVendedores = [];
    let userCoordenates = [];

    let buscado = this.datos.filter((item) => {
      return item.nombre == nombre;
    });

    this.copyDatos = buscado;

    // Crear promesas para obtener las coordenadas y los identificadores de los vendedores
    let promises = buscado.map((item) => {
      return new Promise((resolve) => {
        this.products.getCoordenates(item.idVendedor).subscribe((data) => {
          coordenadas.push([parseFloat(data[0].lat), parseFloat(data[0].alt)]);
          idVendedores.push(item.idVendedor);
          resolve(1); // Resuelve la promesa una vez se han obtenido las coordenadas
        });
      });
    });

    // Promesa para obtener las coordenadas del usuario
    let userPromise = new Promise((resolve) => {
      this.products.getCoordenates(usuario).subscribe((data) => {
        userCoordenates.push([
          parseFloat(data[0].lat),
          parseFloat(data[0].alt),
        ]);
        resolve(1);
      });
    });

    // Esperar a que todas las promesas se completen
    Promise.all([...promises, userPromise]).then(() => {
      let distancias = [];
      for (let i = 0; i < coordenadas.length; i++) {
        distancias.push({
          id: idVendedores[i],
          distancia: this.calcularDistanciaPrecisa(
            coordenadas[i][0],
            coordenadas[i][1],
            userCoordenates[0][0],
            userCoordenates[0][1]
          ),
        });
      }
      distancias = distancias.sort((a, b) => {
        return a.distancia - b.distancia;
      });
      let datos = [];
      for (let i = 0; i < distancias.length; i++) {
        let dato = this.datos.filter((item) => {
          return (
            item.idVendedor == distancias[i]['id'] && item.nombre == nombre
          );
        })[0];
        datos.push(dato);
      }
      if(!this.showMap) {
        
      this.copyDatos = datos;
      }
      if(this.showMap) {
        this.loadMap({
          nombre: 'localizacion de usuario',
          coordenadas: userCoordenates,
        });
        const mapEle = this.elementRef.nativeElement.querySelector('#map');
        console.log(datos)
        for(let i = 0 ; i < datos.length; i++) {
          google.maps.event.addListenerOnce(this.map, 'idle', () => {
            mapEle.classList.add('show-map');
            this.addMarker({
              position: {
                lat:coordenadas[i][0],
                lng: coordenadas[i][1],
              },
              title: datos[i].nombre,
            },[datos[i].idEquipoMedico,datos[i].idVendedor]);
          });
        }
      }
      // Aquí puedes trabajar con las coordenadas, identificadores y las del usuario
    });
  }

  calcularDistanciaPrecisa(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const radioTierra = 6371; // Radio medio de la Tierra en kilómetros

    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distancia = radioTierra * c;

    return distancia;
  }

  toRadians(grados: number): number {
    return grados * (Math.PI / 180);
  }

  loadMap(equipoMedico) {
    const mapEle = this.elementRef.nativeElement.querySelector('#map');
    // create LatLng object
    console.log(mapEle)
    const myLatLng = {
      lat: equipoMedico.coordenadas[0][0],
      lng: equipoMedico.coordenadas[0][1],
    };
    // create map
    console.log(myLatLng);
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 8,
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.addMarker({
        position: {
          lat: equipoMedico.coordenadas[0][0],
          lng: equipoMedico.coordenadas[0][1],
        },
        title: equipoMedico.nombre,
      });
    });
    // create a new map by passing HTMLElement
  }

  addMarker(marker: Marker, id?: any) {
    const newMarker = new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
    });
  
    if (id) {
      newMarker.addListener('click', () => {
        this.solicitar(id);
      });
    }
  
    return newMarker;
  }

  async alerta(equipoMedico){
    const usuario = JSON.parse(localStorage.getItem('Usuario')).idUsuario
    const alert = await this.alertController.create({
      header: 'seguro que quieres escoger este equipoMedico',
      message: equipoMedico.nombre,
      buttons: [{
        text: 'si',
        handler: ()=>{
          this.products.donacionAsignada(equipoMedico.idEquipoMedico,usuario).subscribe(data => {
            if(data['affectedRows']==1){
              equipoMedico.estado = 'Asignado';
              this.products.updateProduct(equipoMedico).subscribe(data => {
                if(data['affectedRows']==1){
                  this.copyDatos = this.datos.filter(item => {
                    return item.idEquipoMedico != equipoMedico.idEquipoMedico
                  })
                }
              })
            }
          })
        }},{
          text: 'no'
        }]
    })
    alert.present()
  }

  audioSearch(){
    if(this.shearch){
      this.microfono.startRecord().then((result => {
        this.microfono.chunks = []
      this.microfono.datos = ''
      this.buscar(result['transcription'])
      }))
      this.shearch = false
      return
    }
    this.microfono.stopRecord()
    
    this.shearch = true
   

  }
}
