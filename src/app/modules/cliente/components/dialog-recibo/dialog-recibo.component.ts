import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-dialog-recibo',
  templateUrl: './dialog-recibo.component.html',
  styleUrls: ['./dialog-recibo.component.css']
})
export class DialogReciboComponent implements OnInit{
  items: any;
  prueba: any;
  constructor( public dialogRef: MatDialogRef<DialogReciboComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthService){}

  ngOnInit(): void {
    
    //console.log(this.data.idCompra);
    this.auth.reciboCompra(this.data.idCompra).subscribe({
      next: (resultData) => {
        console.log(resultData);
        this.items = resultData;
      }, error: (error) => {
        console.log(error);
      }
    });
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  imprimirPantalla() {
    printJS({
      //Se agrega el nombre-de-la-clase-o-id-del-elemento-a-imprimir
      printable: 'ticket_user',
      type: 'html',
      targetStyles: ['*'],
      documentTitle: 'Recibo de compra'
    });
  }
}
