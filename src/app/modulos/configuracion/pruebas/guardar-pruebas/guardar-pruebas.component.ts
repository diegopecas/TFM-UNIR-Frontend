import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IPrueba } from "src/app/common/models/prueba";
import { PruebaService } from "src/app/common/services/prueba.service";
import Swal from "sweetalert2";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Component({
  selector: "app-guardar-pruebas",
  templateUrl: "./guardar-pruebas.component.html",
})
export class GuardarPruebasComponent implements OnInit {
  rutaGeneral = "configuracion/pruebas";
  pruebaForm = new FormGroup({
    nombre: new FormControl(""),
    estado: new FormControl(""),
    descripcion: new FormControl(""),
  });

  private id: any = null;

  get nombre() {
    return this.pruebaForm.get("nombre");
  }

  get estado() {
    return this.pruebaForm.get("estado");
  }

  get descripcion() {
    return this.pruebaForm.get("descripcion");
  }

  constructor(
    private pruebaService: PruebaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // TO-DO
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.pruebaService.singleRead(this.id).subscribe((response: any) => {
        console.log("editar single read", response);
        this.nombre?.setValue(response.nombre);
        this.estado?.setValue(response.estado);
        this.descripcion?.setValue(atob(response.descripcion));
      });
    }
  }

  guardar() {
    let objeto: IPrueba = {
      id: this.id ? this.id : 0,
      nombre: this.nombre?.value,
      estado: this.estado?.value,
      descripcion: btoa(this.descripcion?.value),
    };
    console.log('GUARDAR', objeto);
    !this.id
      ? this.pruebaService.create(objeto).subscribe(() => {
          this.router.navigate([this.rutaGeneral]);
        })
      : this.pruebaService.update(objeto).subscribe(() => {
          this.router.navigate([this.rutaGeneral]);
        });
  }

  cancelar() {
    this.router.navigate([this.rutaGeneral]);
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
