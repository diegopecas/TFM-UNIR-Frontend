import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import {
  BootstrapButtonsTable,
  OptionsTable,
} from "src/app/common/tables/data-table";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Component({
  selector: "app-datatable",
  templateUrl: "./datatable.component.html",
})
export class DatatableComponent
  implements AfterViewInit, OnDestroy, OnInit, OnChanges
{
  @Input() datos: Array<any> = [];
  @Input() opciones: Array<any> = [];
  @Input() id: string = "";
  @Input() rutaGeneral: string = "";
  @Input() rutaConsulta: string = "";
  @Input() rutaEdicion: string = "";
  @Input() columnaEstado: string = "";
  @Input() condicionEstado: string = "";
  @Input() transformaciones: Object = {};
  @Input() consultarRegistros: boolean = true;
  @Input() editarRegistros: boolean = true;
  @Input() eliminarRegistros: boolean = true;
  @Input() cambiarEstadoRegistros: boolean = true;
  @Input() verFiltros: boolean = true;
  @Input() verColumnas: boolean = true;
  @Input() crear: boolean = true;
  @Input() copiar: boolean = true;
  @Input() imprimir: boolean = true;
  @Input() excel: boolean = true;
  @Input() botones: Array<any> = [];
  @Input() botonesGenerales: Array<any> = [];

  @Output() accion = new EventEmitter<any>();
  @Output() accionGeneral = new EventEmitter<any>();

  isDtInitialized: boolean = false;
  /*private getAccionGeneral() {
    return this.accionGeneral;
  }*/

  ngOnChanges(changes: SimpleChanges) {
    this.datosFilter = changes.datos.currentValue;
    this.datosOriginal = this.datosFilter;
    this.opcionesTabla(this.datosOriginal);
    this.configurarPermisos(this.parametros);
    this.rerender();
  }

  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  parametros = {
    consultar: true,
    editar: true,
    eliminar: true,
    cambiarEstado: true,
    columnaEstado: "",
    condicionEstado: "",
    transformaciones: {} as any,
    id: "",
    verFiltros: true,
    verColumnas: true,
    crear: true,
    copiar: true,
    imprimir: true,
    excel: true,
    botones: [] as Array<any>,
    botonesGenerales: [] as Array<any>,
  };

  datosOriginal = [] as any;
  datosFilter = [] as any;
  columnas: Array<any> = [];
  acciones = {} as any;
  dtOptions: any = {};

  constructor(private renderer: Renderer2, private router: Router) {
    // Esto es intencional
  }

  ngOnInit(): void {
    
    this.parametros.consultar = this.consultarRegistros;
    this.parametros.editar = this.editarRegistros;
    this.parametros.eliminar = this.eliminarRegistros;
    this.parametros.cambiarEstado = this.cambiarEstadoRegistros;
    this.parametros.columnaEstado = this.columnaEstado;
    this.parametros.condicionEstado = this.condicionEstado;
    this.parametros.transformaciones = this.transformaciones;
    this.parametros.id = this.id;
    this.parametros.verFiltros = this.verFiltros;
    this.parametros.verColumnas = this.verColumnas;
    this.parametros.crear = this.crear;
    this.parametros.copiar = this.copiar;
    this.parametros.imprimir = this.imprimir;
    this.parametros.excel = this.excel;
    this.parametros.botones = this.botones;
    this.parametros.botonesGenerales = this.botonesGenerales;

    this.configurarPermisos(this.parametros);
    this.datosFilter = [...this.datos];
    this.datosOriginal = [...this.datos];

    this.opcionesTabla(this.datosOriginal);
  }

  ngAfterViewInit(): void {
    this.renderer.listen("document", "click", (event) => {
      if (event.target.hasAttribute("consultar")) {
        this.consultar(event.target.getAttribute("consultar"));
      }
      if (event.target.hasAttribute("editar")) {
        this.editar(event.target.getAttribute("editar"));
      }
      if (event.target.hasAttribute("eliminar")) {
        this.eliminar(event.target.getAttribute("eliminar"));
      }
      if (event.target.hasAttribute("activar")) {
        this.activar(event.target.getAttribute("activar"));
      }
      if (event.target.hasAttribute("inactivar")) {
        this.inactivar(event.target.getAttribute("inactivar"));
      }
      if (event.target.hasAttribute("accionExtra")) {
        this.accionExtra(
          event.target.getAttribute("accionExtra"),
          event.target.getAttribute("item")
        );
      }
    });

    // this.dtTrigger.next();
    if (this.isDtInitialized) {
      console.log('EXISTED')
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      console.log('CREATED')
      this.isDtInitialized = true;
      this.dtTrigger.next();
    }
    this.filtrar();
  }

  opcionesTabla(datosIngreso: any) {
    this.opciones
      .filter((op: any) => op.tipo === "seleccion")
      .forEach((s: any) => {
        s.opciones = [
          ...new Set(datosIngreso.map((item: any) => item[s.data])),
        ];
      });

    this.columnas = [...this.opciones, this.acciones];

    this.dtOptions = OptionsTable.options(
      this.router,
      this.rutaGeneral,
      false,
      this.parametros.verFiltros,
      this.parametros.verColumnas,
      this.parametros.copiar,
      this.parametros.imprimir,
      this.parametros.excel,
      this.parametros.crear,
      this.accionGeneral,
      this.botonesGenerales
    );
    this.dtOptions.data = datosIngreso;
    this.dtOptions.columns = this.columnas;
  }

  configurarPermisos(parametros: any) {
    this.acciones = {
      title: "Acciones",
      class: "text-center",
      render: function (data: any, type: any, full: any, meta: any) {
        let parametroId = ("" + full[parametros.id])
          .replace("<del><em>", "")
          .replace("</em></del>", "");
        let accionEstado =
          full[parametros.columnaEstado] ===
          "<del><em>" + parametros.condicionEstado + "</em></del>"
            ? '<a class="sish-boton-verde" title="ver"><em class="fas fa-toggle-on" activar="' +
              parametroId +
              '"></em></a>'
            : '<a class="sish-boton-gris" title="ver"><em class="fas fa-toggle-off" inactivar="' +
              parametroId +
              '"></em></a>';

        let botonesAdicionales = "";
        parametros.botones.forEach((boton: any) => {
          botonesAdicionales =
            botonesAdicionales +
            '<a class="' +
            boton.class +
            '" title="' +
            boton.title +
            '"><em class="' +
            boton.icon +
            '" accionExtra="' +
            boton.action +
            '" item="' +
            parametroId +
            '"></em></a>';
        });

        let configPermisos =
          (parametros.cambiarEstado ? accionEstado : "") +
          (parametros.consultar
            ? '<a class="sish-boton-azul-claro" title="ver"><em class="fas fa-glasses" consultar="' +
              parametroId +
              '"></em></a>'
            : "") +
          (parametros.editar
            ? '<a class="sish-boton-naranja" title="editar"><em class="fas fa-edit" editar="' +
              parametroId +
              '"></em></a>'
            : "") +
          (parametros.eliminar
            ? '<a class="sish-boton-rojo" title="eliminar"><em class="fas fa-trash-alt" eliminar="' +
              parametroId +
              '"></em></a>'
            : "") +
          botonesAdicionales;

        return configPermisos;
      },
    };
  }

  consultar(item: any) {
    this.router.navigate([this.rutaConsulta + item]);
  }

  editar(item: any) {
    this.router.navigate([this.rutaEdicion + item]);
  }

  eliminar(item: any) {
    const swalWithBootstrapButtons = Swal.mixin(
      BootstrapButtonsTable.bootstrap_buttons_mixin
    );

    swalWithBootstrapButtons
      .fire(BootstrapButtonsTable.bootstrap_buttons_eliminar)
      .then((result) => {
        if (result.isConfirmed) {
          let registros = this.datosOriginal.filter(
            (d: any) => "" + d[this.parametros.id] === item
          );
          this.accion.emit({ accion: "eliminar", registro: registros[0] });
        }
      });
  }

  activar(item: any) {
    const swalWithBootstrapButtons = Swal.mixin(
      BootstrapButtonsTable.bootstrap_buttons_mixin
    );

    swalWithBootstrapButtons
      .fire(BootstrapButtonsTable.bootstrap_buttons_activar)
      .then((result) => {
        if (result.isConfirmed) {
          let registros = this.datosOriginal.filter(
            (d: any) => "" + d[this.parametros.id] === item
          );
          this.accion.emit({ accion: "activar", registro: registros[0] });
        }
      });
  }

  inactivar(item: any) {
    const swalWithBootstrapButtons = Swal.mixin(
      BootstrapButtonsTable.bootstrap_buttons_mixin
    );

    swalWithBootstrapButtons
      .fire(BootstrapButtonsTable.bootstrap_buttons_inactivar)
      .then((result) => {
        if (result.isConfirmed) {
          let registros = this.datosOriginal.filter(
            (d: any) => "" + d[this.parametros.id] === item
          );
          this.accion.emit({ accion: "inactivar", registro: registros[0] });
        }
      });
  }

  accionExtra(accion: string, item: any) {
    let registros = this.datosOriginal.filter(
      (d: any) => "" + d[this.parametros.id] === item
    );

    this.accion.emit({ accion: accion, registro: registros[0] });
  }

  filtrarParametro(f: any, e: any, min?: any, max?: any) {
    let col = this.columnas.filter((op: any) => op.data === f)[0] as any;

    if (min) {
      col.filterValueMin = e.target.value;
    } else if (max) {
      col.filterValueMax = e.target.value;
    } else {
      col.filterValue = e.target.value;
    }
  }

  filtrar() {
    let columnasFiltros = this.dtOptions.columns.filter((op: any) => op.filter);

    let filtros = {} as any;

    columnasFiltros.forEach((f: any) => {
      switch (f.tipo) {
        case "rangoNumero":
          filtros[f.data] = ["#", f.filterValueMin, f.filterValueMax];
          break;
        case "rangoFecha":
          filtros[f.data] = ["><", f.filterValueMin, f.filterValueMax];
          break;
        case "seleccion":
          filtros[f.data] = ["=", f.filterValue];
          break;
        default:
          filtros[f.data] = ["%", f.filterValue];
      }
    });

    let datosTmp = this.datos as any;

    let resultado = [] as any;

    resultado = datosTmp.filter((item: any) => {
      for (let key in filtros) {
        if (filtros[key] !== undefined) {
          switch (filtros[key][0]) {
            case "#":
              if (filtros[key][1]) {
                if (filtros[key][1] > item[key]) {
                  return false;
                }
              }
              if (filtros[key][2]) {
                if (filtros[key][2] < item[key]) {
                  return false;
                }
              }
              break;
            case "><":
              if (filtros[key][1]) {
                let d1 = new Date(filtros[key][1]);
                let d2 = new Date(item[key]);
                if (d1 > d2) {
                  return false;
                }
              }
              if (filtros[key][2]) {
                let d1 = new Date(filtros[key][2]);
                let d2 = new Date(item[key]);
                if (d1 < d2) {
                  return false;
                }
              }
              break;
            case "=":
              if (filtros[key][1]) {
                if (filtros[key][1] !== item[key]) {
                  return false;
                }
              }
              break;
            default:
              if (
                !JSON.stringify(item[key])
                  .toLowerCase()
                  .includes(filtros[key][1].toLowerCase())
              ) {
                return false;
              }
          }
        }
      }
      return true;
    });

    this.datosFilter = resultado;

    this.rerender();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    if (this.datatableElement && this.columnas.length > 0) {
      let nuevosDatos = [] as any;

      let col = (this.columnas as any).map((d: any) => d.data);

      this.datosFilter.forEach((d: any) => {
        let response = {} as any;

        for (let i = 0; i < col.length - 1; i++) {
          let valor = this.transformar(col[i], d[col[i]]);
          let valorCol = this.transformar(
            this.parametros.columnaEstado,
            d[this.parametros.columnaEstado]
          );

          response[col[i]] =
            valorCol === this.parametros.condicionEstado
              ? "<del><em>" + valor + "</em></del>"
              : valor;
        }
        nuevosDatos.push(response);
      });
      if (this.isDtInitialized) {
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtOptions.data = nuevosDatos;
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true;
        this.dtTrigger.next();
      }
    }
  }

  transformar(attr: any, item: any) {
    let t = this.parametros.transformaciones[attr]
      ? this.parametros.transformaciones[attr]["" + item]
        ? this.parametros.transformaciones[attr]["" + item]
        : item
      : item;
    return t;
  }
}
