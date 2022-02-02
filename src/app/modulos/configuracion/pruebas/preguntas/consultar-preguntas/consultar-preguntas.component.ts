import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { PreguntaService } from "src/app/common/services/pregunta.service";
import { IPregunta } from "src/app/common/models/pregunta";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-consultar-preguntas",
  templateUrl: "./consultar-preguntas.component.html",
})
export class ConsultarPreguntasComponent implements OnInit {
  rutaGeneral = "configuracion/preguntas/guardar/"+this.route.snapshot.paramMap.get("prueba")+"/"+this.route.snapshot.paramMap.get("paso")+"/";
  rutaEdicion = "configuracion/preguntas/guardar/"+this.route.snapshot.paramMap.get("prueba")+"/"+this.route.snapshot.paramMap.get("paso")+"/";
  rutaPasos = "configuracion/pasos/"+this.route.snapshot.paramMap.get("prueba");

  datosFilter = [] as IPregunta[];

  columnas = [
    {
      title: "ID",
      data: "id",
      visible: true,
      filter: false,
    },
    {
      title: "Paso",
      data: "paso",
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
    },
    {
      title: "Tipo",
      data: "tipo",
      filter: true,
      class: "text-justify",
      filterValue: "",
      tipo: "texto",
    },
    {
      title: "Opciones",
      data: "opciones",
      filter: false,
      visible: false,
      class: "text-justify",
      filterValue: "",
      tipo: "texto",
    }
  ];

  botones = [
    /*{
      class: "sish-boton-azul",
      title: "Ver opciones",
      action: "ver_opciones",
      icon: "far fa-question-circle",
    }*/
  ];

  botonesGenerales = [
    {
      text: 'Regresar a pasos',
      action: 'regresar',
    },
  ];

  constructor(
    private preguntaService: PreguntaService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    // Esto es intencional
  }

  ngOnInit(): void {
    // This is intentional
    this.consultarTodo();
  }

  consultarTodo() {
    let idPaso = this.route.snapshot.paramMap.get("paso");
    this.preguntaService.read_paso(idPaso).subscribe(
      (response: any) => {
        console.log("consultarTodo response", response);
        this.datosFilter = response?.body?.map((r: IPregunta) => r) || [];
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
        this.router.navigate([this.rutaPasos]);
        break;
    }
  }

  accionRegistro(e: any) {
    // TO-DO
    console.log("registro", e);
    switch (e.accion) {
      case "eliminar":
        this.preguntaService.delete(e.registro.id).subscribe((r: any) => {
          // TO-DO
          this.consultarTodo();
        });
        break;
      case "ver_opciones":
        /*e.registro.estado = e.registro.estado === '1' ? 0 : 1;
        this.pasoService.update(e.registro).subscribe((r: any) => {
          // TO-DO
          this.consultarTodo();
        });*/
        break;
    }
  }
}
