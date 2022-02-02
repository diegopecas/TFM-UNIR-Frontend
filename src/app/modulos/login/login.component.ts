import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { IUsuario } from "src/app/common/models/usuario";
import { UsuarioService } from "src/app/common/services/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    user: "",
    password: "",
  });

  get user() {
    return this.loginForm.get("user");
  }
  
  get password() {
    return this.loginForm.get("password");
  }

  accion = "login";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    // This is intentional
    sessionStorage.clear();
  }

  ngOnInit(): void {
    // inicio
  }

  onSubmit(): void {
    // Process checkout data here
    console.log('DATA', this.user?.value, this.password?.value);
    const usuario:IUsuario = {
      nombre: this.user?.value,
      contrasena: this.password?.value
    }
    this.usuarioService.read_pw(usuario).subscribe((response:any)=>{
      if (response.body) {
        this.loginForm.reset();
        this.router.navigate(["/usuarios/inicio"]);
        sessionStorage.setItem("usuario", JSON.stringify(response.body[0]));
      } else {
        Swal.fire('Error al autenticar.','Los datos no son correctos, por favor intente nuevamente.','error');
      }
    })
  }

  registrar() {
    this.accion = "registro";
  }

  cancelar() {
    this.accion = "login";
  }

  accionRegistro(e: any) {
    console.log("ACCION", e);
    switch (e.accion) {
      case "guardar":
        const usuario: IUsuario = {
          nombre: e.usuario.user,
          contrasena: e.usuario.password,
          rol: 24,
        };
        this.usuarioService.create(usuario).subscribe((response:any)=>{
          Swal.fire('Usuario registrado','Se registró el usuario '+e.usuario.user,'success');
          this.accion = "login";
        },(error:any)=>{
          Swal.fire('Usuario no registrado','Ocurrió un error al registrar el usuario, por favor intente nuevamente.','error');
        })
        break;
    }
  }
}
