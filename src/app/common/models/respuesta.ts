import { IPregunta } from "./pregunta";

export interface IRespuesta {
  id?: Number;
  pregunta?: IPregunta;
  respuesta?: String;
  evaluacion?: String;
  observacion?: String;
  ejecucion?: Number;
}
