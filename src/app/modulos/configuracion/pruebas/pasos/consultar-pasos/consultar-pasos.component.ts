import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { PasoService } from "src/app/common/services/paso.service";
import { IPaso } from "src/app/common/models/paso";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-consultar-pasos",
  templateUrl: "./consultar-pasos.component.html",
})
export class ConsultarPasosComponent implements OnInit {
  rutaGeneral = "configuracion/pasos/guardar/";
  rutaEdicion = "configuracion/pasos/guardar/";
  rutaPruebas = "configuracion/pruebas";
  rutaPreguntas = "configuracion/preguntas/";

  datosFilter = [] as IPaso[];

  columnas = [
    {
      title: "ID",
      data: "id",
      visible: true,
      filter: false,
    },
    {
      title: "Prueba",
      data: "prueba",
      visible: false,
      filter: false,
    },
    {
      title: "Nombre",
      data: "nombre",
      filter: true,
      class: "text-justify",
      filterValue: "",
      tipo: "texto",
    }
  ];

  botones = [
    {
      class: "sish-boton-azul",
      title: "Ver preguntas",
      action: "ver_preguntas",
      icon: "far fa-question-circle",
    }
  ];

  botonesGenerales = [
    {
      text: 'Regresar a pruebas',
      action: 'regresar',
    },
  ];

  constructor(
    private pasoService: PasoService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    // Esto es intencional
  }

  ngOnInit(): void {
    // This is intentional
    let idPrueba = this.route.snapshot.paramMap.get("prueba");
    this.rutaGeneral = this.rutaGeneral + idPrueba + '/';
    this.rutaEdicion = this.rutaEdicion + idPrueba + '/';
    this.consultarTodo();
  }

  consultarTodo() {
    let idPrueba = this.route.snapshot.paramMap.get("prueba");
    this.pasoService.read_prueba(idPrueba).subscribe(
      (response: any) => {
        console.log("response", response);
        this.datosFilter = response.map((r: IPaso) => r);
      },
      (error: any) => {
        console.error("Error al leer permisos", error);
      }
    );
  }

  accionGeneral(e: any) {
    // TO-DO
    console.log("general", e);
    switch(e){
      case 'regresar':
        this.router.navigate([this.rutaPruebas]);
        break;
    }
  }

  accionRegistro(e: any) {
    // TO-DO
    console.log("registro", e);
    switch (e.accion) {
      case "eliminar":
        this.pasoService.delete(e.registro.id).subscribe((r: any) => {
          // TO-DO
          this.consultarTodo();
        });
        break;
      case "ver_preguntas":
        /*e.registro.estado = e.registro.estado === '1' ? 0 : 1;
        this.pasoService.update(e.registro).subscribe((r: any) => {
          // TO-DO
          this.consultarTodo();
        });*/
        this.router.navigate([this.rutaPreguntas+e.registro.prueba+'/'+e.registro.id]);
        break;
    }
  }
}
