import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donador',
  templateUrl: './donador.page.html',
  styleUrls: ['./donador.page.scss'],
})
export class DonadorPage implements OnInit {

  show:string = 'listado';
  showSelected!:string
  constructor(private router:Router) { }

  ngOnInit() {
  }

  changeSelected(select){
    if(select !== this.showSelected){
      this.show = select
    }
  }

  logOut(){
    //this.crud.SessionOut();
    localStorage.removeItem('Usuario')
    this.router.navigate(['/']);
  }
 
}
