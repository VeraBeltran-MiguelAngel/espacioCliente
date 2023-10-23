import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  perfilRegistrado: any;
  jsonperfil: any;
  name: any;

  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    //guardamos la cadena json
    this.perfilRegistrado = this.auth.getUserData();

    if (this.perfilRegistrado) {
      //lo convertimos a json nuevamente
      this.jsonperfil = JSON.parse(this.perfilRegistrado);

      const name = this.jsonperfil.name;

      console.log('Nombre:', name);
    } else {
      console.log('No se encontraron datos en el localStorage.');
    }

    // this.name=Object.keys(this.jsonperfil)[1];
    // alert('el nombre del usuario es :'+ this.name);

    // console.log(Object.keys(this.jsonperfil));

    //     var miVariable = { test: {typeA: '501', typeB : '502' } };;
    // var resultado = Object.keys(miVariable)[0]; // Sera el valor del key test
    // alert(resultado);
  }
}
