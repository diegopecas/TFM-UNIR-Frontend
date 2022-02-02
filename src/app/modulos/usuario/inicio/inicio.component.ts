import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/common/models/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  public usuario:IUsuario;

  constructor() { 
    // This is intentional
  }

  ngOnInit(): void {
    // This is intentional
    this.usuario = JSON.parse(sessionStorage.getItem("usuario")??'') as IUsuario;
    console.log('Usuario', this.usuario);
  }

}
