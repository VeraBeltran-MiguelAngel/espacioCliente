import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-mi-membresia',
  templateUrl: './mi-membresia.component.html',
  styleUrls: ['./mi-membresia.component.css']
})
export class MiMembresiaComponent implements OnInit {
  //para poder usar los valores del local(solo es un string) storage tienes que crear un arreglo
  usuarioRegistrado: any[] = [];
  
  //Variable que contendra los datos retornados por el servicio datosUsuario
  datos: any;
  horarios: any;
  membresias: any;

  //Variable para almacenar el nombre del gimansio actual del usuario
  nomGymActual: any;

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    //guardar la cadena del local storage (contiene la info del usuario)
    const localData = this.auth.getUserData(); 

    if (localData != null) {
      //convertimos la cadena en arreglo y lo guardamos en usuarioRegistrado
      this.usuarioRegistrado = JSON.parse(localData);
    }
    //console.log(this.usuarioRegistrado);
    //Mandar a traer los datos del usuario/gymnasio/membresia/...
    this.auth.datosUsuario(this.usuarioRegistrado[0].ID_Cliente).subscribe({ 
      next: (resultData) => {
        this.datos = resultData;
        //console.log(this.datos);
        //console.log(this.datos[0].nombreGym)
        this.nomGymActual = this.datos[0].titulo;
      },error: (error) => {
        console.error(error);
      }
    });

    //Consultar horarios de gimnasio
    this.auth.consultarHorario(this.usuarioRegistrado[0].Gimnasio_idGimnasio).subscribe({ 
      next: (resultData2) => {
        this.horarios = resultData2;
        //console.log(this.horarios);
      },error: (error) => {
        console.error(error);
      }
    });

    //Consultar las membresias de corresppndientes al gimansio actual
    this.auth.datosMembresia(this.usuarioRegistrado[0].Gimnasio_idGimnasio).subscribe({
      next: (resultData3) => {
        this.membresias = resultData3;
      }, error: (error) => {
        console.log(error);
      }
    });
  }


}
