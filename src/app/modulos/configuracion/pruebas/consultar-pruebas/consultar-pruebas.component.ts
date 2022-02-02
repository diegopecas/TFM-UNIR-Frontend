import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { PruebaService } from "src/app/common/services/prueba.service";
import { IPrueba } from "src/app/common/models/prueba";
import { Router } from "@angular/router";

@Component({
  selector: "app-consultar-pruebas",
  templateUrl: "./consultar-pruebas.component.html",
})
export class ConsultarPruebasComponent implements OnInit {
  rutaGeneral = "configuracion/pruebas/guardar";
  rutaEdicion = "configuracion/pruebas/guardar/";
  rutaPasos = "configuracion/pasos/";
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
      title: "Ver pasos",
      action: "ver_pasos",
      icon: "fas fa-shoe-prints",
    },
    {
      class: "sish-boton-naranja",
      title: "Cambiar estado",
      action: "cambiar_estado",
      icon: "fas fa-exchange-alt",
    },
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
        this.datosFilter = response.map((r: IPrueba) => r);
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
      case "eliminar":
        this.pruebaService.delete(e.registro.id).subscribe((r: any) => {
          // TO-DO
          this.consultarTodo();
        });
        break;
      case "cambiar_estado":
        e.registro.estado = e.registro.estado === '1' ? 0 : 1;
        this.pruebaService.update(e.registro).subscribe((r: any) => {
          // TO-DO
          this.consultarTodo();
        });
        break;
        case "ver_pasos":
          this.router.navigate([this.rutaPasos + e.registro.id]);
          break;
    }
  }
}
