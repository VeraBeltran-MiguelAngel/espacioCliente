import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  User: any;

  hide = true;
  loginForm: FormGroup;

  // usuarioRegistrado: any[] = [];
  // objetoRegistro: any = { username: '', password: '' };
  // loginObj: any = { username: '', password: '' };

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['cliente']);
    }
  }

  onSubmit(): void {
    console.log('Hiciste clic en enviar');
    //imprime los datos recibidos del formulario
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (respuesta) => {
          console.log(respuesta);
          localStorage.setItem('userData', JSON.stringify(respuesta));
          this.router.navigate(['/cliente']);
        },
        error: (paramError) => {
          alert('Error subscribe: ' + paramError);
        },
      });
    }

    //se suscribe para monitorear la respuesta del api (ya que esta valida si son correctas o no)
    // this.auth.enviarCredenciales(this.loginForm.value).subscribe((respuesta) => {
    //   console.log(respuesta);
    //   this.User = respuesta;
    // });
  }
}
