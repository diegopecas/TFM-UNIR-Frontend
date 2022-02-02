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
  selector: "app-pregunta-abierta",
  templateUrl: "./pregunta-abierta.component.html",
})
export class PreguntaAbiertaComponent implements OnInit, OnChanges {
  @Input() pregunta: IPregunta;

  @Output() accion = new EventEmitter<any>();

  public _pregunta: IPregunta;

  constructor() {
    // This is intentional
  }
  ngOnChanges(changes: SimpleChanges): void {
    this._pregunta = changes.pregunta.currentValue;
  }

  ngOnInit(): void {
    // This is intentional
    this._pregunta = this.pregunta;
  }

  respuesta() {
    this.accion.emit({ accion: "respuesta" });
  }
}
