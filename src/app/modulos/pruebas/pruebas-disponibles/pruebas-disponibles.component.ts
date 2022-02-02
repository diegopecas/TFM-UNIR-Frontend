import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { PruebaService } from "src/app/common/services/prueba.service";
import { IPrueba } from "src/app/common/models/prueba";
import { Router } from "@angular/router";

@Component({
  selector: "app-pruebas-disponibles",
  templateUrl: "./pruebas-disponibles.component.html",
})
export class PruebasDisponiblesComponent implements OnInit {
  rutaGeneral = "";
  rutaEdicion = "";

  datosFilter = [] as IPrueba[];

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
    {
      title: "Estado",
      data: "estado",
      filter: true,
      class: "text-center",
      filterValue: "",
      tipo: "seleccion",
    },
  ];

  botones = [
    {
      class: "sish-boton-azul",
      title: "Ejecutar",
      action: "ejecutar",
      icon: "fas fa-shoe-prints",
    }
  ];

  constructor(
    private pruebaService: PruebaService,
    private router: Router
    ) {
    // Esto es intencional
  }

  ngOnInit(): void {
    // This is intentional
    console.log("ngOnInitPruebas");
    this.consultarTodo();
  }

  consultarTodo() {
    this.pruebaService.read().subscribe(
      (response: any) => {
        console.log("response", response);
        this.datosFilter = response.map((r: IPrueba) => r).filter((p:any)=> p.estado === '1');
      },
      (error: any) => {
        console.error("Error al leer permisos", error);
      }
    );
  }

  accionGeneral(e: any) {
    // TO-DO
    console.log("general", e);
  }

  accionRegistro(e: any) {
    // TO-DO
    console.log("registro", e);
    switch (e.accion) {
      case "ejecutar":
        this.router.navigate(['pruebas/ejecutar/' + e.registro.id]);
      break;
    }
  }
}
