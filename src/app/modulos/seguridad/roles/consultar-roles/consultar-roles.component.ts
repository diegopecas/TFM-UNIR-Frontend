import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { RolService } from "src/app/common/services/rol.service";
import { IRol } from "src/app/common/models/rol";

@Component({
  selector: 'app-consultar-roles',
  templateUrl: './consultar-roles.component.html'
})
export class ConsultarRolesComponent implements OnInit {

  rutaGeneral = "";

  datosFilter = [] as IRol[];

  columnas = [
    {
      title: "ID",
      data: "id",
      visible: true,
      filter: false,
    },
    {
      title: "Nombre",
      data: "nombre",
      filter: true,
      class: "text-justify",
      filterValue: "",
      tipo: "texto",
    },
  ];

  constructor(private rolService:RolService) {
    // This is intentional
   }

  ngOnInit(): void {
    // This is intentional
    this.rolService.read().subscribe(
      (response: any) => {
        console.log('response', response);
        this.datosFilter = response.map((r:IRol) => r);
      },
      (error: any) => {
        console.error('Error al leer permisos', error);
      }
    );
  }

  accionGeneral(e: any) {
    // TO-DO
  }

  accionRegistro(e: any) {
    // TO-DO
  }

}
