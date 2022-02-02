import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["../login.component.css"],
})
export class RegistroComponent implements OnInit {
  @Output() accion = new EventEmitter<any>();

  registroForm = this.formBuilder.group({
    user: ["", Validators.email],
    password: "",
    rePassword: "",
  });

  get user() {
    return this.registroForm.get("user");
  }

  get password() {
    return this.registroForm.get("password");
  }

  get rePassword() {
    return this.registroForm.get("rePassword");
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    // This is intentional
  }

  ngOnInit(): void {
    // inicio
  }

  onSubmit(): void {
    // Process checkout data here
    // this.registroForm.reset();
    // this.router.navigate(['/usuarios']);

    if (this.registroForm.valid) {
        if(this.password?.value == this.rePassword?.value) {
            this.accion.emit({
              accion: "guardar",
              usuario: { user: this.user?.value, password: this.password?.value },
            });
        } else {
            Swal.fire('Clave errónea','Las contraseñas ingresadas no son iguales.','error');
        }
    } else {
        Swal.fire('Datos no válidos','Por favor revise los datos de registro.','error');
    }
  }

  cancelar() {
    this.accion.emit({ e: "cancelar" });
  }
}
