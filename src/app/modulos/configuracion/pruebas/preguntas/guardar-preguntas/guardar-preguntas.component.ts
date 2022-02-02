import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IPregunta } from "src/app/common/models/pregunta";
import { PreguntaService } from "src/app/common/services/pregunta.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-guardar-preguntas",
  templateUrl: "./guardar-preguntas.component.html",
})
export class GuardarPreguntasComponent implements OnInit {
  rutaPasos = "configuracion/preguntas/"+this.route.snapshot.paramMap.get("prueba")+"/"+this.route.snapshot.paramMap.get("paso");

  preguntaForm = new FormGroup({
    paso: new FormControl(""),
    nombre: new FormControl(""),
    tipo: new FormControl(""),
    opciones: new FormControl(""),
  });

  private id: any = null;

  get nombre() {
    return this.preguntaForm.get("nombre");
  }

  get paso() {
    return this.preguntaForm.get("paso");
  }

  get tipo() {
    return this.preguntaForm.get("tipo");
  }
  
  get opciones() {
    return this.preguntaForm.get("opciones");
  }

  constructor(
    private preguntaService: PreguntaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // TO-DO
    this.id = this.route.snapshot.paramMap.get("id");
    let paramPaso = this.route.snapshot.paramMap.get("paso");
    if (this.id) {
      this.preguntaService.singleRead(this.id).subscribe((response: any) => {
        console.log("editar single read", response);
        this.paso?.setValue(response.paso);
        this.nombre?.setValue(response.nombre);
        this.tipo?.setValue(response.tipo);
        this.opciones?.setValue(response.opciones);
      });
    } else if (paramPaso) {
      this.paso?.setValue(paramPaso);
    }
  }

  cambiarTipo(){
    console.log('cambiarTipo')
    this.opciones?.setValue('');
  }

  guardar() {
    
    let objeto: IPregunta = {
      id: this.id ? this.id : 0,
      paso: this.paso?.value,
      nombre: this.nombre?.value,
      tipo: this.tipo?.value,
      opciones: this.opciones?.value
    };
    
    !this.id
      ? this.preguntaService.create(objeto).subscribe((response:any) => {
          console.log('guardar pregunta', response);
          this.router.navigate([
            this.rutaPasos
          ]);
        })
      : this.preguntaService.update(objeto).subscribe((response:any) => {
        console.log('actualizar pregunta', response);
          this.router.navigate([
            this.rutaPasos
          ]);
        });
  }

  cancelar() {
    this.router.navigate([
      this.rutaPasos
    ]);
  }

  validar() {}
}
