import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { IPaso } from "src/app/common/models/paso";
import { IPregunta } from "src/app/common/models/pregunta";
import { IPrueba } from "src/app/common/models/prueba";
import { PreguntaService } from "src/app/common/services/pregunta.service";

@Component({
  selector: "app-paso",
  templateUrl: "./paso.component.html",
})
export class PasoComponent implements OnInit, OnChanges {
  @Input() prueba: IPrueba;
  @Input() paso: IPaso;

  @Output() accion = new EventEmitter<any>();

  public _paso: IPaso;

  public _preguntas: Array<IPregunta>;

  constructor(
    private router: Router,
    private preguntaService: PreguntaService
  ) {
    // This is intentional
  }
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    this._paso = changes.paso.currentValue;
    this._preguntas = changes.paso.currentValue.preguntas;
    // this.obtenerPreguntas();
  }

  ngOnInit(): void {
    // This is intentional
    this._paso = this.paso;
    
    console.log('las preguntas', this.paso);
    // this.obtenerPreguntas();
  }

  /*obtenerPreguntas() {
    this.preguntaService.read_paso(this._paso.id).subscribe((response: any) => {
      this._preguntas = response.body.map((p: any) => {
        return {
          id: p.id,
          paso: p.paso,
          nombre: p.nombre,
          tipo: p.tipo,
          opciones: p.opciones,
        };
      });
    });
  }*/

  recibirRespuesta(r: any) {
    this.accion.emit(r);
  }

  anterior() {
    this.accion.emit({ accion: "anterior" });
  }

  siguiente() {
    this.accion.emit({ accion: "siguiente" });
  }
}
