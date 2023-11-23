import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, formulario: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = formulario && formulario.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  //Variables correspondientes al formulario
  form: FormGroup;
  
  //Variable para identificar / apoyar en errores para validacion
  matcher = new MyErrorStateMatcher();

   //para poder usar los valores del local(solo es un string) storage tienes que crear un arreglo
   usuarioRegistrado: any[] = [];
   curp: string;

   //Lista de estado que se agregaran en el combo - select
    listaEstados: any[] =  [
    {value: 'Aguascalientes', viewValue: 'Aguascalientes'},
    {value: 'Baja California', viewValue: 'Baja California'},
    {value: 'Baja California Sur', viewValue: 'Baja California Sur'},
    {value: 'Campeche', viewValue: 'Campeche'},
    {value: 'Chiapas', viewValue: 'Chiapas'},
    {value: 'Chihuahua', viewValue: 'Chihuahua'},
    {value: 'Coahuila', viewValue: 'Coahuila'},
    {value: 'Colima', viewValue: 'Colima'},
    {value: 'Ciudad de México', viewValue: 'CDMX'},
    {value: 'Durango', viewValue: 'Durango'},
    {value: 'Guanajuato', viewValue: 'Guanajuato'},
    {value: 'Guerrero', viewValue: 'Guerrero'},
    {value: 'Hidalgo', viewValue: 'Hidalgo'},
    {value: 'Jalisco', viewValue: 'Jalisco'},
    {value: 'México', viewValue: 'México'},
    {value: 'Michoacán', viewValue: 'Michoacán'},
    {value: 'Morelos', viewValue: 'Morelos'},
    {value: 'Nayarit', viewValue: 'Nayarit'},
    {value: 'Nuevo León', viewValue: 'Nuevo León'},
    {value: 'Oaxaca', viewValue: 'Oaxaca'},
    {value: 'Puebla', viewValue: 'Puebla'},
    {value: 'Querétaro', viewValue: 'Querétaro'},
    {value: 'San Luis Potosi', viewValue: 'San Luis Potosi'},
    {value: 'Sinaloa', viewValue: 'Sinaloa'},
    {value: 'Sonora', viewValue: 'Sonora'},
    {value: 'Tabasco', viewValue: 'Tabasco'},
    {value: 'Tamaulipas', viewValue: 'Tamaulipas'},
    {value: 'Tlaxcala', viewValue: 'Tlaxcala'},
    {value: 'Veracruz', viewValue: 'Veracruz'},
    {value: 'Yucatán', viewValue: 'Yucatán'},
    {value: 'Zacatecas', viewValue: 'Zacatecas'}
  ];

  constructor( private auth: AuthService, private fb: FormBuilder, private toastr: ToastrService){}

  ngOnInit(): void {
    //guardar la cadena del local storage (contiene la info del usuario)
    const localData = this.auth.getUserData(); 

    //Validar que existan los datos del usuario
    if (localData != null) {
      //convertimos la cadena en arreglo y lo guardamos en usuarioRegistrado
      this.usuarioRegistrado = JSON.parse(localData);
      //accedemos al indice 0 (por que solo es un registro) al indice name
      this.curp = this.usuarioRegistrado[0].curp;
    }

    //Asignar los valoreas alojados en el local storage a los campos de formulario
    this.form = this.fb.group({
      curp: [this.usuarioRegistrado[0].curp, Validators.compose([ Validators.pattern(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/)])],
      nombre: [this.usuarioRegistrado[0].nombre, Validators.compose([ Validators.required, Validators.pattern(/^[A-Za-zñÑáéíóú ]*[A-Za-z][A-Za-zñÑáéíóú ]*$/)])],
      apPaterno: [this.usuarioRegistrado[0].apPaterno, Validators.compose([ Validators.required, Validators.pattern(/^[A-Za-zñÑáéíóú ]*[A-Za-z][A-Za-zñÑáéíóú ]*$/)])],
      apMaterno: [this.usuarioRegistrado[0].apMaterno, Validators.compose([ Validators.required, Validators.pattern(/^[A-Za-zñÑáéíóú ]*[A-Za-z][A-Za-zñÑáéíóú ]*$/)])],
      telefono: [this.usuarioRegistrado[0].telefono, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^(0|[1-9][0-9]*)$/)])],
      codigoPostal: [this.usuarioRegistrado[0].codigoPostal, Validators.compose([Validators.pattern(/^(0|[1-9][0-9]*)$/), Validators.minLength(5)])],
      estado: [this.usuarioRegistrado[0].estado, Validators.compose([Validators.required])],
      ciudad: [this.usuarioRegistrado[0].ciudad, Validators.compose([Validators.required ,Validators.pattern(/^[A-Za-zñÑáéíóú ]*[A-Za-z][A-Za-zñÑáéíóú ]*$/)])],
      colonia: [this.usuarioRegistrado[0].colonia, Validators.compose([Validators.required , Validators.pattern(/^[A-Za-zñÑáéíóú0-9 ]*[A-Za-z][A-Za-zñÑáéíóú0-9 ]*$/)])],
      calle: [this.usuarioRegistrado[0].calle, Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zñÑáéíóú0-9 ]*[A-Za-z][A-Za-zñÑáéíóú0-9 ]*$/)])],
      numExt: [this.usuarioRegistrado[0].numExt, Validators.compose([Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)])],
      numInt: [this.usuarioRegistrado[0].numInt, Validators.compose([Validators.pattern(/^(0|[1-9][0-9]*)$/)])],
      //fechaNacimiento: [this.usuarioRegistrado[0].fechaNacimiento],
      email: [this.usuarioRegistrado[0].email, Validators.compose([Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)])]
    });
  }

  //Actualizar datos
  actualizar(){
    this.auth.actualizarRegsitro(this.form.value, this.usuarioRegistrado[0].ID_Cliente).subscribe({
      next: (resultData) => {
        console.log(resultData.msg);
        //mensaje de error - generado apartir de la existencia previa del email en la bd
        if(resultData.msg == 'existe_mail'){
          this.toastr.error('El correo ya existe.', 'Error!!!');
        }
        //mensaje de actualización correcta
        if(resultData.msg == 'Success'){
          //marcar un formulario como no modificado o en su estado inicial.
          this.form.markAsPristine(); 
          //  marcar un control de formulario como no tocado, indicando que el usuario no ha interactuado con él.
          this.form.markAsUntouched();
          this.toastr.success('Registro actualizado correctamente.', 'Exíto!!!');
        }   
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
