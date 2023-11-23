import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

//para conectarse al api
import { HttpClient, HttpHeaders } from '@angular/common/http';

//modelo usuarios
import { User, detalles, mensaje, dataGym, dataHoraios, historial, dataMembresia } from './User';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //variable que guarda el endpoint
  API: string = 'https://olympus.arvispace.com/espacioCliente/conf/';
  Api_home: string = 'https://olympus.arvispace.com/conPrincipal/espacioCliente.php';
  
  //para guardar los headers que manda el API
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private router: Router, private clienteHttp: HttpClient, private toastr:ToastrService) {}

  setUserData(userData: string): void {
    localStorage.setItem('userData', userData);
  }

  getUserData(): string | null {
    return localStorage.getItem('userData');
  }

  isLoggedIn() {
    return this.getUserData() !== null;
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

  login(credenciales: User): Observable<any> {
    return this.clienteHttp
      .post(this.API + '?credenciales', credenciales, { headers: this.httpHeaders })
      .pipe(
        catchError((err: any) => {
          if (err.status === 401) {
            this.router.navigate(['/login']);
            const errorMessage = err.error.message;
            // this.toastr.error(errorMessage,'Error');
          //  alert(`Error 401: ${errorMessage}`);
            return throwError(() => errorMessage);
          }else{
            return throwError(() => 'Error desconocido');
          }
        })
      );
  }

  //Mostrar datos de usuario componente HOME ----------------------- Roghelio
  datosUsuario(id: string):Observable<any> {
    return this.clienteHttp.get<detalles>(this.Api_home + '?detalle='+id);
  }

  //Consultar los horarios de gimnasio componente mi-membresia ----- Roghelio
  consultarHorario(id: string):Observable<any>{
    return this.clienteHttp.get<dataHoraios>(this.Api_home + '?horarios=' +id);
  }

  //Actualizar datos de cliente componente perfil ------------------ Roghelio
  actualizarRegsitro(data: any, id: string):Observable<any> {
    return this.clienteHttp.post<mensaje>(this.Api_home+'?actualizar='+id,data,{ headers: this.httpHeaders });
  }

  //Listar gimansios de manera general ----------------------------- Roghelio
  gimnasiosLista():Observable<any>{
    return this.clienteHttp.get<dataGym>(this.Api_home+'?listaGym');
  }

  //Lista de horarios de manera general ---------------------------- Roghelio
  horariosLista():Observable<any>{
    return this.clienteHttp.get<dataHoraios>(this.Api_home+'?listaHorarios');
  }

  //Actualizar id gimnasio - componente gimnasio -------------------- Roghelio
  cambiarGym(data: any, id: number):Observable<any>{
    return this.clienteHttp.post<mensaje>(this.Api_home+'?actualizaGym='+id,data,{ headers: this.httpHeaders });
  }

  //Traer historial de compras - componente pagos ------------------- Roghelio
  historialCompra(id: number):Observable<any> {
    return this.clienteHttp.get<historial>(this.Api_home+'?historial='+id);
  }

  //Datos membresias general - componente membresia ----------------- Roghelio
  datosMembresia(id: string):Observable<any> {
    return this.clienteHttp.get<dataMembresia>(this.Api_home+'?membresia='+id);
  }

  //Datos membresia - gimnasio - componente detalle ----------------- Roghelio
  detallesMembresia(id: string):Observable<any> {
    return this.clienteHttp.get(this.Api_home+'?detalles='+id);
  }

}
