import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

//para conectarse al api
import { HttpClient, HttpHeaders } from '@angular/common/http';

//modelo usuarios
import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //variable que guarda el endpoint
  API: string = 'http://localhost/usuario/';
  //para guardar los headers que manda el API
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private router: Router, private clienteHttp: HttpClient) {}

  // setToken(token: string): void {
  //   localStorage.setItem('token', token);
  // }

  getToken(): string | null {
    return localStorage.getItem('userData');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('userData');
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

  login(credenciales: any): Observable<any> {
    return this.clienteHttp
      .post(this.API + '?dato', credenciales, { headers: this.httpHeaders })
      .pipe(
        catchError((err: any) => {
          if (err.status === 401) {
            this.router.navigate(['/login']);
            const errorMessage = err.error.message;
            alert(`Error 401: ${errorMessage}`);
            return throwError(() => errorMessage);
          }else{
            return throwError(() => 'Error desconocido');
          }
        })
      );
  }

  // enviarCredenciales(datosUser: User): Observable<any> {
  //   return this.clienteHttp
  //     .post<any>(this.API + '?datos', datosUser, { headers: this.httpHeaders })
  //     .pipe(
  //       catchError((error: any) => {
  //         if (error.status === 401) {
  //           return throwError(()=>error); // Devuelve un nuevo Observable de error
  //         } else {
  //           return throwError('Error desconocido'); // Puedes personalizar el mensaje de error
  //         }
  //       })
  //     );
  // }

  // enviarCredenciales(datosUser: User): Observable<any> {
  //   return this.clienteHttp
  //     .post<any>(this.API + '?datos', datosUser, { headers: this.httpHeaders })
  //     .pipe(
  //       tap((paramResponse) => {
  //         let varArrayTapUser = paramResponse as User[];
  //         console.log('ClienteService: tap 2');
  //         varArrayTapUser.forEach((itemCliente) => {
  //           //mostramos datos de cada cliente en el log
  //           console.log(itemCliente.username);
  //         });
  //       })
  //       catchError((error: any) => {
  //         if (error.status === 401) {
  //           this.router.navigate(['/login']);
  //           // Si el código de respuesta es 401, el mensaje de error está en error.error.message
  //           const errorMessage = error.error.message;
  //           alert(`Error 401: ${errorMessage}`);
  //           return throwError(() => errorMessage);
  //         } else {
  //           // Puedes personalizar el mensaje de error
  //           return throwError(() => 'Error desconocido');
  //         }
  //       })
  //     );
  // }
}
