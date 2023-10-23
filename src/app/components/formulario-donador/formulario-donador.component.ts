import { Component, OnInit } from '@angular/core';
import {MedictoolsService} from '../../service/medictools.service'
import { AuthenticateService } from 'src/app/service/authenticate.service';
@Component({
  selector: 'app-formulario-donador',
  templateUrl: './formulario-donador.component.html',
  styleUrls: ['./formulario-donador.component.scss'],
})
export class FormularioDonadorComponent  implements OnInit {

  constructor(private medictools:MedictoolsService, private crud:AuthenticateService) { }

  ngOnInit() {}

 
}
