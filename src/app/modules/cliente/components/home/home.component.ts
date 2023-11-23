import { Component, OnInit } from '@angular/core';
import { SafeValue } from '@angular/platform-browser';//para redireccionar a una liga segura
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  //para poder usar los valores del local(solo es un string) storage tienes que crear un arreglo
  usuarioRegistrado: any[] = [];
  nombreUsuario :string;
  correo:string;

   //para crear qr
   qrdata :any;
   qrCodeDownloadLink :SafeValue='';

  //Variable que contendra los datos retornados por el servicio datosUsuario
  datos: any;

  //Mostrar el status de la membresia conforme al status 1/0
  estado: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    //para activar el debug en consola
    // debugger;

    //guardar la cadena del local storage (contiene la info del usuario)
    const localData = this.auth.getUserData(); 

    if (localData != null) {
      //convertimos la cadena en arreglo y lo guardamos en usuarioRegistrado
      this.usuarioRegistrado = JSON.parse(localData);
      //accedemos al indice 0 (por que solo es un registro) al indice name
      this.nombreUsuario = this.usuarioRegistrado[0].nombre;
      this.correo=this.usuarioRegistrado[0].email;
      this.qrdata=this.correo; //guardamos el correo del usuario que inicia sesion en el QR 
      this.nombreUsuario = this.usuarioRegistrado[0].nombre;
    }

    //console.log(this.usuarioRegistrado);
    //Mandar a traer los datos del usuario/gymnasio/membresia/...
    this.auth.datosUsuario(this.usuarioRegistrado[0].ID_Cliente).subscribe({ 
      next: (resultData) => {
        this.datos = resultData;
        //console.log(this.datos);
        
        //Mostrar mensaje deacuerdo al estatus del status de la membresia del usuario
        this.datos[0].estatus == '1' ? this.estado=true : this.estado = false;

      },error: (error) => {
        console.error(error);
      }
    });
  }

  onChange(url:any){
    this.qrCodeDownloadLink = url;
  }
}
