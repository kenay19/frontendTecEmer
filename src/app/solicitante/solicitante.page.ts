import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.page.html',
  styleUrls: ['./solicitante.page.scss'],
})
export class SolicitantePage implements OnInit {

  page =  'listado'
  usuario!: any;
  nombre !: string
  constructor(private router:Router) { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('Usuario'));
    this.nombre = this.usuario.nombre
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
