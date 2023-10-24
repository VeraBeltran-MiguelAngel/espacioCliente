import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
          alert('Iniciaste sesión');
          console.log(respuesta);
          //guardamos el registro del usuario en el local storage
          this.auth.setUserData(JSON.stringify(respuesta));
          this.router.navigate(['/cliente']);
        },
        error: (paramError) => {
         console.error('Error subscribe: ' + paramError);
        },
      });
    }
  }
}
