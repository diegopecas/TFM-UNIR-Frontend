import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-izquierdo',
  templateUrl: './menu-izquierdo.component.html'
})
export class MenuIzquierdoComponent implements OnInit {

  constructor(private router: Router) { 
    // This is intentional
  }

  ngOnInit(): void {
    // This is intentional
  }

  irA(ruta:string) {
    this.router.navigate([ruta]);
  }
}
