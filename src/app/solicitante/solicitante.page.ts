import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.page.html',
  styleUrls: ['./solicitante.page.scss'],
})
export class SolicitantePage implements OnInit {

  page =  'solicitud'

  constructor(private router:Router) { }

  ngOnInit() {
  }

  changeView(page){
    if(page !== this.page){
      this.page = page;
    }
  }

  out(){
    localStorage.removeItem('Usuario');
    this.router.navigate(['/home'])
  }
}
