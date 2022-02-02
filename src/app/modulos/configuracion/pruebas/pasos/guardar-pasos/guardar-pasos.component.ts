import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IPaso } from "src/app/common/models/paso";
import { PasoService } from "src/app/common/services/paso.service";
import Swal from "sweetalert2";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-guardar-pasos",
  templateUrl: "./guardar-pasos.component.html",
})
export class GuardarPasosComponent implements OnInit {
  rutaPasos = "configuracion/pasos/"+this.route.snapshot.paramMap.get("prueba");
  pasoForm = new FormGroup({
    prueba: new FormControl(""),
    nombre: new FormControl(""),
    descripcion: new FormControl(""),
  });

  private id: any = null;

  get nombre() {
    return this.pasoForm.get("nombre");
  }

  get prueba() {
    return this.pasoForm.get("prueba");
  }

  get descripcion() {
    return this.pasoForm.get("descripcion");
  }

  constructor(
    private pasoService: PasoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // TO-DO
    this.id = this.route.snapshot.paramMap.get("id");
    let paramPrueba = this.route.snapshot.paramMap.get("prueba");
    // this.rutaGeneral = this.rutaGeneral + paramPrueba
    if (this.id) {
      this.pasoService.singleRead(this.id).subscribe((response: any) => {
        console.log("editar single read", response);
        this.nombre?.setValue(response.nombre);
        this.prueba?.setValue(response.prueba);
        this.descripcion?.setValue(atob(response.descripcion));
      });
    } else if (paramPrueba) {
      this.prueba?.setValue(paramPrueba);
    }
  }

  guardar() {
    let objeto: IPaso = {
      id: this.id ? this.id : 0,
      nombre: this.nombre?.value,
      prueba: this.prueba?.value,
      descripcion: btoa(this.descripcion?.value),
    };
    console.log('guardar paso', objeto);
    !this.id
      ? this.pasoService.create(objeto).subscribe(() => {
        this.router.navigate([this.rutaPasos]);
        })
      : this.pasoService.update(objeto).subscribe(() => {
        this.router.navigate([this.rutaPasos]);
        });
  }

  cancelar() {
    this.router.navigate([this.rutaPasos]);
  }

  validar() {}

  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "300px",
    minHeight: "0",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [["bold", "italic"], ["fontSize"]],
  };
  
}
