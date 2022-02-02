import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-historico-usuario",
  templateUrl: "./historico-usuario.component.html",
})
export class HistoricoUsuarioComponent implements OnInit {
  rutaGeneral = "/pruebas/ejecutar-prueba";

  datosFilter = [] as any;

  columnas = [
    {
      title: "ID",
      data: "id",
      visible: false,
      filter: false,
    },
    {
      title: "Fecha",
      data: "fecha",
      filter: true,
      class: "text-center",
      filterValueMin: "",
      filterValueMax: "",
      tipo: "rangoFecha",
    },
    {
      title: "Descripción",
      data: "descripcion",
      filter: true,
      filterValue: "",
      tipo: "texto",
    },
    {
      title: "Resultado",
      data: "resultado",
      class: "text-center",
      filter: true,
      filterValue: "",
      tipo: "seleccion",
    },
  ];

  ngOnInit(): void {
    this.datosFilter = [
      {
        id: 1,
        fecha: "01-01-2021",
        descripcion: "prueba 1",
        resultado: "aprobado",
      },
      {
        id: 2,
        fecha: "01-02-2021",
        descripcion: "prueba 2",
        resultado: "rechazado",
      },
    ];
  }

  accionGeneral(e: any) {
    console.log("accion general", e);
    Swal.fire({
      customClass: {
        confirmButton: "sish-boton-confirmar",
        cancelButton: "sish-boton-cancelar",
        input: "sish-popup-input",
        title: "sish-popup-title",
      },
      buttonsStyling: false,
      title: "Nuevo valor",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("confirmado");
      }
    });
  }

  accionRegistro(e: any) {
    switch (e.accion) {
      case "Activar": {
        console.log("Activar");
        //statements;
        break;
      }
      case "Inactivar": {
        console.log("Inactivar");
        break;
      }
      case "Eliminar": {
        console.log("Eliminar");
        //statements;
        break;
      }
      default: {
        console.log("default", e);
        //statements;
        break;
      }
    }
  }
}
