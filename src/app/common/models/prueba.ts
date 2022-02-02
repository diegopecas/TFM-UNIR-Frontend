import { IPaso } from "./paso";

export interface IPrueba {
  id?: Number;
  nombre?: String;
  estado?: Number;
  descripcion?: String;
  pasos?: IPaso[];
}
