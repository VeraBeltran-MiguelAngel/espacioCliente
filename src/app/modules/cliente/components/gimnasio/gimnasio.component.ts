import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-gimnasio',
  templateUrl: './gimnasio.component.html',
  styleUrls: ['./gimnasio.component.css']
})
export class GimnasioComponent implements OnInit {
   //Variables correspondientes al formulario
   form: FormGroup;
  //Variables para guardar las lista gimnasios y horarios
  listaGimnasios: any;
  listaHorarios: any;
  //Variable que alojara el gimnasio actual
  gym_actual: any;
  gym_ok: number;
  cliente: number;

  //Variable creada para hacer pruebas / validaciones de evento ngchange
  selectedOption: string;

  //para poder usar los valores del local(solo es un string) storage tienes que crear un arreglo
  usuarioRegistrado: any[] = [];

  constructor(private auth: AuthService, 
    private toastr: ToastrService, 
    private fb: FormBuilder, 
    private activeRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.gym_actual =  this.activeRoute.snapshot.paramMap.get('id');
    this.gym_ok = +this.gym_actual;
    //console.log(this.gym_actual);

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

    //Traer la lista de gimnasios
    this.auth.gimnasiosLista().subscribe({
      next: (resultData) => {
        this.listaGimnasios = resultData;
      },error: (error) => {
        console.error(error);
      }
    });

    //Traer la lista de horarios 
    this.auth.horariosLista().subscribe({
      next: (resultDataH) => {
        this.listaHorarios = resultDataH;
      }, error: (error) => {
        console.log(error);
      }
    });

    //Asignar el valor del gimnasio actual del usuario/cliente
    this.form = this.fb.group({
      idGimnasio: [this.gym_actual]
    });
  }

  //Realizar em cambio de valor de id de gimnasio - para mostrar en pantalla los datos
  infoGym(event: number){
    //console.log("Opción seleccionada:", event);
    this.gym_ok = event;
  }

  //Hacer la actualizacion - cambio de gimnasio
  actualizar(){
    console.log("Apachurrame cuando sea tuyo...")

    this.auth.cambiarGym(this.form.value, this.cliente).subscribe({
      next: (resultData) => {
        if(resultData.msg == 'Success'){
          this.toastr.success('Cambio de gimnasio actualizado correctamente.', 'Exíto!!!');
        }
      }, error: (error) => {
        console.log(error);
      }
    });

    //Mandar a llamar la funcion para actualizar el LS del cliente
    this.updateLs();
  }

  //Actualizar los datos del LocalStorage
  updateLs():void{
    this.auth.actualizarLS(this.usuarioRegistrado[0].ID_Cliente).subscribe({
      next: (resultData) => {
        console.log(resultData);
        //Actualizamos el registro del usuario en el local storage
        this.auth.setUserData(JSON.stringify(resultData));
      }, error: (error) => {
        console.log(error);
      }
    });
  }

}
