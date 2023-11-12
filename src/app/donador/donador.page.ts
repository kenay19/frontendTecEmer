import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donador',
  templateUrl: './donador.page.html',
  styleUrls: ['./donador.page.scss'],
})
export class DonadorPage implements OnInit {

  show:string = 'listado';
  showSelected!:string
  constructor() { }

  ngOnInit() {
  }

  changeSelected(select){
    if(select !== this.showSelected){
      this.show = select
    }
  }
 
}
