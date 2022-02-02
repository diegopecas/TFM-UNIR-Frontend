import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-usuarios',
  templateUrl: './consultar-usuarios.component.html',
})
export class ConsultarUsuariosComponent implements OnInit {
  rutaGeneral = 'configuracion/usuarios/guardar/0';
  rutaConsulta = 'configuracion/usuarios/guardar/';
  rutaEdicion = 'configuracion/usuarios/guardar/';

  accionRegistro(e: any) {
    switch (e.accion) {
      case 'Activar': {
        console.log('Activar');
        //statements;
        break;
      }
      case 'Inactivar': {
        console.log('Inactivar');
        break;
      }
      case 'Eliminar': {
        console.log('Eliminar');
        //statements;
        break;
      }
      default: {
        console.log('default', e);
        //statements;
        break;
      }
    }
  }

  accionGeneral(e: any) {
    console.log('accion general', e);
    Swal.fire({
      customClass: {
        confirmButton: 'sish-boton-confirmar',
        cancelButton: 'sish-boton-cancelar',
        input: 'sish-popup-input',
        title: 'sish-popup-title'
      },
      buttonsStyling: false,
      title: 'Nuevo valor',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('confirmado');
      }
    });
  }

  datosFilter = [] as any;
  columnas = [
    {
      title: 'ID',
      data: 'id',
      visible: false,
      filter: true,
      filterValueMin: '',
      filterValueMax: '',
      tipo: 'rangoNumero',
    },
    {
      title: 'Rol',
      data: 'nombre',
      filter: true,
      filterValue: '',
      tipo: 'seleccion',
    },
    {
      title: 'Descripción',
      data: 'descripcion',
      filter: true,
      filterValue: '',
      tipo: 'texto',
    },
    {
      title: 'Activo',
      data: 'estado',
      class: 'text-center',
      filter: true,
      filterValue: '',
      tipo: 'seleccion',
    },
    {
      title: 'Creado',
      data: 'fechaCreacion',
      class: 'text-center',
      visible: false,
      filter: true,
      filterValueMin: '',
      filterValueMax: '',
      tipo: 'rangoFecha',
    },
    {
      title: 'Modificado',
      data: 'fechaModificacion',
      class: 'text-center',
      visible: false,
    },
  ];

  botones = [
    {
      class: 'sish-boton-azul',
      title: 'Valores',
      action: 'valores',
      icon: 'fas fa-tasks',
    },
    {
      class: 'sish-boton-naranja',
      title: 'Ir al mapa',
      action: 'mapa',
      icon: 'fas fa-globe-americas',
    },
  ];

  botonesGenerales = [
    {
      text: 'boton 1',
      action: 'boton1',
    },
    {
      text: 'boton 2',
      action: 'boton2',
    },
  ];

  constructor() {
    // Esto es intencional
  }

  ngOnInit(): void {
    this.obtener();
  }

  obtener() {
    let dato: any = []; //datosEjemplo;
    this.datosFilter = dato.default;
    console.log('intro', this.datosFilter);
  }
  actualizar(obj: any) {
    // datos
  }
}
