import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar-dominios',
  templateUrl: './consultar-dominios.component.html'
})
export class ConsultarDominiosComponent implements OnInit {
  dtOptions: any = {};

  constructor(
    private router: Router
  ) {
    // This is intentional
  }

  ngOnInit(): void {
    // This is intentional
  }

}
