import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogReciboComponent } from '../dialog-recibo/dialog-recibo.component';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  //para poder usar los valores del local(solo es un string) storage tienes que crear un arreglo
  usuarioRegistrado: any[] = [];

  //ALmacenar el id de cliente
  cliente: number;
  //Almacenar la informacion de la compra
  compras: any;
  //Almacenar datos de la compra
  items: any;
  constructor(private auth: AuthService, private dialog: MatDialog) { }

  //Pruebas
  fechaMasActual: any;
  datosUltimaCompra: any;

  ngOnInit(): void {
    //guardar la cadena del local storage (contiene la info del usuario)
    const localData = this.auth.getUserData();

    //Validar que existan los datos del usuario
    if (localData != null) {
      //convertimos la cadena en arreglo y lo guardamos en usuarioRegistrado
      this.usuarioRegistrado = JSON.parse(localData);
      //accedemos al indice 0 (por que solo es un registro) al indice name
      const ide = this.usuarioRegistrado[0].ID_Cliente;
      this.cliente = +ide;
    }

    //Traer la informacion del historial de compras del usuario
    this.auth.historialCompra(this.cliente).subscribe({
      next: (resultData) => {
        this.compras = resultData;
        //console.log(this.compras);

        const fechas = resultData.map((dato: any) => new Date(dato.fechaInicio));
        const fechaMasReciente = new Date(Math.max.apply(null, fechas.map((fecha: any) => fecha.getTime())));

        // Filtrar los datos por fecha
        const datosFiltrados = resultData.filter((dato: any) => new Date(dato.fechaInicio).getTime() === fechaMasReciente.getTime());

        //this.fechaMasReciente = fechaMasReciente;
        this.datosUltimaCompra = datosFiltrados;
        //console.log(this.datosUltimaCompra);
      }, error: (error) => {
        console.log(error);
      }
    });
  }

  //Obtener el mes de la fecha del servicio
  obtenerMesPago(fecha: Date): string {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const fechaObj = new Date(fecha) ;
    const mesIndex = (fechaObj.getMonth() );
    return meses[mesIndex];
  }

  //Obtener el formato de salida: 21 de noviembre de 2023
  obtenerFechaFormateadaPago(fecha: Date): string {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate() + 1;
    const mesIndex = (fechaObj.getMonth() );
    const anio = fechaObj.getFullYear();

    return `${dia} de ${meses[mesIndex]} de ${anio}`;
  }

  //Obtener el mes de la fecha del servicio
  obtenerNombreMes(fecha: Date): string {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const fechaObj = new Date(fecha);
    const mesIndex = fechaObj.getMonth();
    return meses[mesIndex];
  }

  //Obtener el formato de salida: 21 de noviembre de 2023
  obtenerFechaFormateada(fecha: Date): string {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate() + 1;
    const mesIndex = fechaObj.getMonth();
    const anio = fechaObj.getFullYear();

    return `${dia} de ${meses[mesIndex]} de ${anio}`;
  }

   //Mandar a traer el MatDialog - pansadole el paramero
  imprimirRecibo2(idCompra: string) {
    //console.log(idCompra);
    const dialogRef = this.dialog.open(DialogReciboComponent, {
      //width: '800px', // Define el ancho del diálogo según tus necesidades
      data: { idCompra } //Se pasan los datos para hacer uso de este dentro del ts del modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo ha sido cerrado');
    });
  }
}
