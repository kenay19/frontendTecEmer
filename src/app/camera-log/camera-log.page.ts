import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera-log',
  templateUrl: './camera-log.page.html',
  styleUrls: ['./camera-log.page.scss'],
})
export class CameraLogPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigateToLogin(){
    this.router.navigate(['/login'])
  }

  navigateToRegisterUser(){
    this.router.navigate(['/registro-usuarios']);
  }

}
