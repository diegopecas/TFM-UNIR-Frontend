import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { PermisoService } from "src/app/common/services/permiso.service";
import { IPermiso } from "src/app/common/models/permiso";

@Component({
  selector: "app-consultar-permisos",
  templateUrl: "./consultar-permisos.component.html",
})
export class ConsultarPermisosComponent implements OnInit {
  rutaGeneral = "";

  datosFilter = [] as any;

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

  constructor(private permisoService: PermisoService) {
    // This is intentional
  }

  ngOnInit(): void {
    // This is intentional
    this.permisoService.read().subscribe(
      (response: any) => {
        this.datosFilter = response.map((r:IPermiso) => r);
      },
      (error: any) => {
        console.error('Error al leer permisos', error);
      }
    );
  }

  accionGeneral(e: any) {
    /*console.log("accion general", e);
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
    });*/
  }

  accionRegistro(e: any) {
    /*switch (e.accion) {
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
    }*/
  }
}
