import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulo correspondiente a las rutas del modulo cliente
import { ClienteRoutingModule } from './cliente-routing.module';

//Importacion de componentes
import { ClienteDashboardComponent } from './components/cliente-dashboard/cliente-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MiMembresiaComponent } from './components/mi-membresia/mi-membresia.component';
import { PagosComponent } from './components/pagos/pagos.component';

//Modulos correspondientes a manejo de formularios
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

//Libreria generador  QR
import { QRCodeModule } from 'angularx-qrcode';

//Librerias correspondientes a iconos - fontawesome / matrerial icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle, faInstagram, faTwitter, faPaypal, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCircleUser, faCreditCard, faCheckCircle, faTriangleExclamation, faXmarkCircle, faLocationDot, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

//Librerias Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { GimnasioComponent } from './components/gimnasio/gimnasio.component';
import { GimnasioPipe } from './pipes/gimnasio.pipe';
import { HorariosPipe } from './pipes/horarios.pipe';
import { DetallesComponent } from './components/detalles/detalles.component';

@NgModule({
  declarations: [
    ClienteDashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PerfilComponent,
    MiMembresiaComponent,
    PagosComponent,
    GimnasioComponent,
    GimnasioPipe,
    HorariosPipe,
    DetallesComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FontAwesomeModule,
    MatIconModule,
    QRCodeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
  ]
})
export class ClienteModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faFacebook, 
      faGoogle, 
      faInstagram, 
      faTwitter, 
      faCircleUser, 
      faCreditCard, 
      faPaypal, 
      faXTwitter, 
      faCheckCircle, 
      faTriangleExclamation,
      faXmarkCircle,
      faLocationDot,
      faCheck 
    ); 
  }
 }
