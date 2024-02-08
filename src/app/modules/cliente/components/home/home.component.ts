import { Component, OnInit } from '@angular/core';
import { SafeValue } from '@angular/platform-browser';//para redireccionar a una liga segura
import { AuthService } from 'src/app/service/auth.service';
import { Options } from 'ngx-qrcode-styling';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //Propiedades de codigo QR - generador con logo
  public config: Options = {
    template: "default",
    type: "canvas",
    shape: "square",
    width: 200,
    height: 200,
    data: '',
    image: "../../../../../assets/img/logo2.png",
    margin: 5,
    dotsOptions: {
      color: "#FD9727",
      type: "rounded"
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 0
    }
  };
  //Propiedades de la libreria
  //https://stackblitz.com/edit/angular-ngx-qrcode-styling?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.ts

  //para poder usar los valores del local(solo es un string) storage tienes que crear un arreglo
  usuarioRegistrado: any[] = [];
  nombreUsuario :string;
  correo:string;

  //Variable que contendra los datos retornados por el servicio datosUsuario
  datos: any;

  //Mostrar el status de la membresia conforme al status 1/0
  estado: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    //guardar la cadena del local storage (contiene la info del usuario)
    const localData = this.auth.getUserData(); 

    if (localData != null) {
      //convertimos la cadena en arreglo y lo guardamos en usuarioRegistrado
      this.usuarioRegistrado = JSON.parse(localData);
      //accedemos al indice 0 (por que solo es un registro) al indice name
      this.nombreUsuario = this.usuarioRegistrado[0].nombre;
      this.correo=this.usuarioRegistrado[0].email;
    }

    //Mandar a traer la informacion del estatus de la membresia - obtener valor del token
    this.auth.getToken(this.usuarioRegistrado[0].ID_Cliente).subscribe({
      next: (resultEstatus) => {
        //console.log(resultEstatus);
        this.config.data = resultEstatus.msg;
      }, error: (error) => { console.log(error) }
    });


    //Mandar a traer los datos del usuario/gymnasio/membresia/...
    this.auth.datosUsuario(this.usuarioRegistrado[0].ID_Cliente).subscribe({ 
      next: (resultData) => {
        this.datos = resultData;
        console.log(this.datos, "datos");
        
        //Mostrar mensaje deacuerdo al estatus del status de la membresia del usuario
        this.datos[0].estatus == '1' ? this.estado=true : this.estado = false;

      },error: (error) => {
        console.error(error);
      }
    });
  }

  //Descargar imagen del QR
  onDownload(qrcode: any): void {
    qrcode.download('codigo-qr.png').subscribe((res: any) => {
      // TO DO something!
      console.log('download:', res);
    });
  }

  formatDate(fecha: string): string {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate() + 1;
    const mesIndex = fechaObj.getMonth();
    const anio = fechaObj.getFullYear();
  
    return `${dia} de ${meses[mesIndex]} de ${anio}`;
  }
  
  
  


 
  

  
  
  
}
