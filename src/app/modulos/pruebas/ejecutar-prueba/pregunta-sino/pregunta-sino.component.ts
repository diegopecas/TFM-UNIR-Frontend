import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
  } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IPaso } from "src/app/common/models/paso";
  import { IPregunta } from "src/app/common/models/pregunta";
import { IPrueba } from "src/app/common/models/prueba";
  
  @Component({
    selector: "app-pregunta-sino",
    templateUrl: "./pregunta-sino.component.html",
  })
  export class PreguntaSiNoComponent implements OnInit, OnChanges {
    
    @Input() prueba: IPrueba;
    @Input() paso: IPaso;
    @Input() pregunta: IPregunta;
  
    @Output() accion = new EventEmitter<any>();
  
    public _pregunta: IPregunta;
  
    SiNoform = this.formBuilder.group({
      respuesta: null,
    });
  
    get respuesta() {
      return this.SiNoform.get("respuesta");
    }
    
    constructor(private formBuilder: FormBuilder) {
      // This is intentional
      
    }

    ngOnChanges(changes: SimpleChanges): void {
      this._pregunta = changes.pregunta.currentValue;
    }
  
    ngOnInit(): void {
      // This is intentional
      this._pregunta = this.pregunta;

      this.SiNoform.get('respuesta')?.valueChanges.subscribe(val => {
        this.enviarRespuesta({valor: val, prueba: this.prueba, paso: this.paso, pregunta: this.pregunta});
      });
    }
  
    enviarRespuesta(valor:any) {
      this.accion.emit({ accion: "respuesta", valor: valor });
    }
  }
  