import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  datos: any[] = [];
  copyDatos: any[] = [];
  showMap: boolean = false;
  map!: any;
  valor: string = '';
  mensaje: string = 'mostrar mapa';
  imageURL: string = '/assets/producto_generico.jpg';
  miCoordenada: any[] = [];
  Coordenadas: any[] = [];
  Vendedores: any[] = [];
  EquipoMedico: any[] = [];
  radio: number = 90;

  shearch: boolean = true;
  constructor(
    private products: ProductsService,
    private elementRef: ElementRef,
    private alertController: AlertController,
    private microfono: MicrofonoService
  ) {}

  //se queda
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
    if (this.mapElement) {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    }
    let usuario = JSON.parse(localStorage.getItem('Usuario')).idUsuario;
    let coordenadas = await this.products.getCoordenates(usuario).toPromise();
    this.miCoordenada.push([
      parseFloat(coordenadas[0].lat),
      parseFloat(coordenadas[0].alt),
    ]);
    this.copyDatos = this.datos;

    await this.generateCoordenadas(this.datos);
    this.calculateDistances();
  }

  // se queda
  solicitar(id) {
    const equipoMedico = this.datos.filter((item) => {
      return item.idEquipoMedico === id[0] && item.idVendedor == id[1];
    });
    this.alerta(equipoMedico[0]);
  }

  // se queda
  cancelar(busqueda) {
    this.copyDatos = this.datos;
    busqueda.value = '';
    //this.valor = ''
    this.mensaje = 'mostrar mapa';
    this.showMap = false;
  }

  // se modificara
  changeView() {
    if (this.mensaje === 'mostrar mapa') {
      this.showMap = true;
      this.mensaje = 'mostrar datos';
      this.generateMapa();
      return;
    } else {
      this.mensaje = 'mostrar mapa';
      this.showMap = false;
    }
  }

  async generateCoordenadas(datos) {
    console.log(datos);
    for (let i = 0; i < datos.length; i++) {
      let result = await this.products
        .getCoordenates(datos[i].idVendedor)
        .toPromise();
      this.Coordenadas.push([
        parseFloat(result[0].lat),
        parseFloat(result[0].alt),
      ]);
      this.Vendedores.push(datos[i].idVendedor);
      this.EquipoMedico.push(datos[i].idEquipoMedico);
    }
    console.log(this.Coordenadas);
    console.log(this.Vendedores);
    console.log(this.EquipoMedico);
  }

  search(nombre) {
    console.log(nombre);
    this.Coordenadas = [];
    this.Vendedores = [];
    this.EquipoMedico = [];

    if (nombre !== '') {
      this.generateCoordenadas(
        this.datos.filter((item) => {
          console.log(
            this.removerAcentosYPuntuacion(item.nombre) ===
              this.removerAcentosYPuntuacion(nombre)
          );
          return (
            this.removerAcentosYPuntuacion(item.nombre) ===
            this.removerAcentosYPuntuacion(nombre)
          );
        })
      ).then(() => {
        this.calculateDistances();
      });
    } else {
      this.generateCoordenadas(this.datos).then(() => {
        this.calculateDistances();
      });
    }
  }
  removerAcentosYPuntuacion(cadena: string): string {
    return cadena
      .normalize('NFD') // Normalizar a Unicode compuesto
      .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
      .replace(/[^\w\s]/g, '') // Eliminar puntuación y caracteres especiales
      .toLowerCase() // Convertir a minúsculas
      .trim(); // Eliminar espacios en blanco al principio y al final
  }

  generateMapa() {
    this.loadMap({
      nombre: 'localizacion de usuario',
      coordenadas: this.miCoordenada,
    });

    const mapEle = this.elementRef.nativeElement.querySelector('#map');
    console.log(mapEle);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');

      // Itera a través de this.copyDatos para agregar marcadores
      this.copyDatos.forEach((dato) => {
        const coordenadaIndex = this.EquipoMedico.indexOf(dato.idEquipoMedico);
        if (coordenadaIndex !== -1) {
          this.addMarker(
            {
              position: {
                lat: this.Coordenadas[coordenadaIndex][0],
                lng: this.Coordenadas[coordenadaIndex][1],
              },
              title: dato.nombre,
            },
            [dato.idEquipoMedico, dato.idVendedor]
          );
        }
      });
    });
  }

  actualizarRadio(radio) {
    this.Coordenadas = [];
    this.Vendedores = [];
    this.EquipoMedico = [];
    this.radio = radio;
    this.search('');
  }

  calculateDistances() {
    let distancias = [];
    console.log(this.Coordenadas);
    for (let i = 0; i < this.Coordenadas.length; i++) {
      distancias.push({
        id: this.Vendedores[i],
        distancia: this.calcularDistanciaPrecisa(
          this.miCoordenada[0][0],
          this.miCoordenada[0][1],
          this.Coordenadas[i][0],
          this.Coordenadas[i][1]
        ),
        idEquipoMedico: this.EquipoMedico[i],
      });
    }

    this.sortDistances(distancias);
  }

  sortDistances(distancias) {
    const insideRadius = distancias.filter(
      (item) => item.distancia <= this.radio
    );

    insideRadius.sort((a, b) => a.distacia - b.distancia);
    let sortProducts = [];

    for (let i = 0; i < insideRadius.length; i++) {
      let vemos = this.datos.filter((item) => {
        return item.idEquipoMedico === insideRadius[i].idEquipoMedico;
      })[0];
      if (vemos) {
        sortProducts.push(vemos);
      }
    }
    this.copyDatos = sortProducts;
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
    console.log(mapEle);
    // create LatLng object
    const myLatLng = {
      lat: equipoMedico.coordenadas[0][0],
      lng: equipoMedico.coordenadas[0][1],
    };
    console.log(myLatLng);
    // create map

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

  async alerta(equipoMedico) {
    const usuario = JSON.parse(localStorage.getItem('Usuario')).idUsuario;
    const alert = await this.alertController.create({
      header: 'seguro que quieres escoger este equipoMedico',
      message: equipoMedico.nombre,
      buttons: [
        {
          text: 'si',
          handler: async () => {
            let res = await this.products
              .donacionAsignada(equipoMedico.idEquipoMedico, usuario)
              .toPromise();
            if (res['affectedRows'] == 1) {
              equipoMedico.estado = 'Asignado';
              res = await this.products.updateProduct(equipoMedico).toPromise();
              if (res['affectedRows'] == 1) {
                this.copyDatos = this.datos.filter((item) => {
                  return item.idEquipoMedico != equipoMedico.idEquipoMedico;
                });
                this.search('')
              }
            }
          },
        },
        {
          text: 'no',
        },
      ],
    });
    alert.present();
  }

  audioSearch() {
    this.Coordenadas = [];
    this.Vendedores = [];
    this.EquipoMedico = [];

    if (this.shearch) {
      this.microfono.startRecord().then((result) => {
        this.microfono.chunks = [];
        this.microfono.datos = '';
        this.valor = result['transcription'];
        this.search(result['transcription']);
      });
      this.shearch = false;
      return;
    }
    this.microfono.stopRecord();

    this.shearch = true;
  }
}
