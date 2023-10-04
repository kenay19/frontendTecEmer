import { Component, OnInit } from '@angular/core';

import {MedictoolsService} from '../../service/medictools.service'
import { AuthenticateService } from 'src/app/service/authenticate.service';
@Component({
  selector: 'app-formulario-vendedor',
  templateUrl: './formulario-vendedor.component.html',
  styleUrls: ['./formulario-vendedor.component.scss'],
})
export class FormularioVendedorComponent  implements OnInit {

  constructor(private medictools:MedictoolsService, private crud:AuthenticateService) { }

  ngOnInit() {}

  guardar(nombre, descripcion, costo) {
    this.medictools.guardar(nombre.value, descripcion.value, costo.value, this.crud.getUser().idUsuario).subscribe(data => {console.log(data)})
  }

}
