import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap, throwError } from 'rxjs';

//para conectarse al api
import { HttpClient } from '@angular/common/http';

//modelo usuarios
import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //variable que guarda el endpoint
  API: string = 'http://localhost/login/';
  constructor(private router: Router, private clienteHttp: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  //login con token
  // login({ email, password }: any): Observable<any> {
  //   if (email === 'cliente@gmail.com' && password === 'cliente123') {
  //     this.setToken('abcdefghijklmnopqrstuvwxyz');
  //     return of({ name: 'Tarique Akhtar', email: 'cliente@gmail.com' });
  //   }
  //   return throwError(() => new Error('Error de autenticacion'));
  // }

  //funciona como un insertar empleado (observa la respuesta del api)
  login(datosUser: User): Observable<any> {
    //para enviar el json con los datos que manda el form para validarlos en el back
    return this.clienteHttp.post(this.API + '?datos', datosUser).pipe(tap());
  }
}
