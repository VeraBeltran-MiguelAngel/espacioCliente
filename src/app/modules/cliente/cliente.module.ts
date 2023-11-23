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
import { QRCodeModule } from 'angularx-qrcode';

//Librerias correspondientes a iconos - fontawesome / matrerial icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle, faInstagram, faTwitter, faPaypal, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCircleUser, faCreditCard, faCheckCircle, faTriangleExclamation  } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ClienteDashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PerfilComponent,
    MiMembresiaComponent,
    PagosComponent,
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FontAwesomeModule,
    MatIconModule
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
      faTriangleExclamation 
    ); 
  }
 }
