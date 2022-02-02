import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { promises } from "dns";
import { IPaso } from "src/app/common/models/paso";
import { IPregunta } from "src/app/common/models/pregunta";
import { IPrueba } from "src/app/common/models/prueba";
import { IRespuesta } from "src/app/common/models/respuesta";
import { PasoService } from "src/app/common/services/paso.service";
import { PreguntaService } from "src/app/common/services/pregunta.service";
import { PruebaService } from "src/app/common/services/prueba.service";
import { RespuestaService } from "src/app/common/services/respuesta.service";

@Component({
  selector: "app-ejecutar-prueba",
  templateUrl: "./ejecutar-prueba.component.html",
})
export class EjecutarPruebaComponent implements OnInit {
  private idPrueba: any;

  public prueba: IPrueba;

  public pasos: IPaso[];

  public respuestas: IRespuesta[] = [];

  public pasoActivo = 0;

  public pasoVista = {};

  public estado = "inicio";

  constructor(
    private route: ActivatedRoute,
    private pruebaService: PruebaService,
    private pasoService: PasoService,
    private preguntaService: PreguntaService,
    private respuestaService: RespuestaService
  ) {}

  async ngOnInit() {
    this.idPrueba = this.route.snapshot.paramMap.get("prueba");
    if (this.idPrueba) {
      const responsePrueba = (await this.pruebaService
        .singleRead(this.idPrueba)
        .toPromise()) as any;

      this.prueba = {
        id: responsePrueba.id,
        nombre: responsePrueba.nombre,
        estado: responsePrueba.estado,
        descripcion: responsePrueba.descripcion
          ? atob(responsePrueba.descripcion.toString())
          : "",
        pasos: [],
      };

      const responsePaso = (await this.pasoService
        .read_prueba(this.idPrueba)
        .toPromise()) as any;
        
      this.prueba.pasos = responsePaso.map((p: any) => {
        return {
          id: p.id,
          prueba: this.prueba.id,
          nombre: p.nombre,
          descripcion: p.descripcion ? atob(p.descripcion.toString()) : "",
          preguntas: [],
        };
      });

      let proms = [] as any[];
      this.prueba.pasos?.forEach((paso:any)=>{
        proms.push(this.preguntaService.read_paso(paso.id).toPromise() as any)
      });

      const responsePreguntas = await Promise.all(proms);

      this.prueba.pasos?.forEach((paso:any, index)=>{
        paso.preguntas = responsePreguntas[index].body.map((p:any)=>{
          return {
            id: p.id,
            paso: p.paso,
            nombre: p.nombre,
            tipo: p.tipo,
            opciones: p.opciones,
          }
        });
      });

      sessionStorage.setItem("prueba", JSON.stringify(this.prueba));
      
    }
  }

  reset() {
    this.estado = "inicio";
    this.pasoActivo = 0;
    this.pasoVista = {};
  }

  iniciar() {
    if (this.prueba.pasos) {
      this.estado = "ejecucion";
      this.pasoActivo = 0;
      this.pasoVista = this.prueba.pasos[this.pasoActivo];
    }
  }

  finalizar() {
    this.estado = "resumen";
  }

  accionPaso(e: any) {
    if (this.prueba.pasos) {
      switch (e.accion) {
        case "anterior":
          if (this.pasoActivo === 0) {
            this.reset();
          } else {
            this.pasoActivo = this.pasoActivo - 1;
            this.pasoVista = this.prueba.pasos[this.pasoActivo];
          }
          break;
        case "siguiente":
          if (this.pasoActivo < this.prueba.pasos.length) {
            this.pasoActivo = this.pasoActivo + 1;
            this.pasoVista = this.prueba.pasos[this.pasoActivo];
          }
          if (this.pasoActivo === this.prueba.pasos.length) {
            this.estado = "resumen";
            this.pasoVista = {};
          }
          break;
        case "respuesta":
          this.setRespuesta(e.valor);
          break;
      }
    }
  }

  setRespuesta(r: any) {
    const elemento = this.respuestas.filter(
      (rp: any) => rp.pregunta.id === r.pregunta.id
    )[0];
    if (elemento !== undefined) {
      const idx = this.respuestas.indexOf(elemento);
      this.respuestas.splice(idx, 1);
    }
    this.respuestas.push({ pregunta: r.pregunta, respuesta: r.valor });
    console.log("respuestas", this.respuestas);
  }

  buscarRespuesta(id:any):String{
    const rta = this.respuestas.filter((r:any)=> r.pregunta.id === id);
    console.log('encontró', id, rta);
    if(rta.length > 0){
      return rta[0].respuesta as String;
    }
    return '';
  }
}
