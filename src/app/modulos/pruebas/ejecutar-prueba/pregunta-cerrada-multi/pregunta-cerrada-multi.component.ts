import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
  } from "@angular/core";
  import { IPregunta } from "src/app/common/models/pregunta";
  
  @Component({
    selector: "app-pregunta-cerrada-multi",
    templateUrl: "./pregunta-cerrada-multi.component.html",
  })
  export class PreguntaCerradaMultiComponent implements OnInit, OnChanges {
    @Input() pregunta: IPregunta;
  
    @Output() accion = new EventEmitter<any>();
  
    public _pregunta: IPregunta;
  
    public _opciones = [] as any[];

    constructor() {
      // This is intentional
    }
    ngOnChanges(changes: SimpleChanges): void {
      this._pregunta = changes.pregunta.currentValue;
      this.obtenerOpciones();
    }
  
    ngOnInit(): void {
      // This is intentional
      this._pregunta = this.pregunta;
      this.obtenerOpciones();
    }
  
    respuesta() {
      this.accion.emit({ accion: "respuesta" });
    }

    obtenerOpciones() {
      this._opciones = this._pregunta?.opciones ? this._pregunta?.opciones?.split('- ').filter((e:any)=>e !== '') : [];
    }
  }
  