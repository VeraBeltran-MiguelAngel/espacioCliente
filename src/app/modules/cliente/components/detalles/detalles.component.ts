import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  // Varible que almacena el valor pasado por URL
  mem_actual: string;
  //Variable que almana el objeto retornado por el servicio detallesMembresia
  dataMem: any;
  constructor(private auth: AuthService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    //Capturar el parametro enviado por URL
    const param =  this.activeRoute.snapshot.paramMap.get('id');
    this.mem_actual = param!.toString();

    //Traer los datos de la membresia
    this.auth.detallesMembresia(this.mem_actual).subscribe({
      next: (resultData) => {
        this.dataMem = resultData;
        console.log(resultData);
      }, error: (error) => {
        console.log(error);
      }
    });
  }
}
