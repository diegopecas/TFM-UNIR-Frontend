import { IPregunta } from "./pregunta";

export interface IPaso {
  id?: Number;
  prueba?: Number;
  nombre?: String;
  descripcion?: String;
  preguntas?: IPregunta[];
}
