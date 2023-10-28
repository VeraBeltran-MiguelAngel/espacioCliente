import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteDashboardComponent } from './components/cliente-dashboard/cliente-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MiMembresiaComponent } from './components/mi-membresia/mi-membresia.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle, faInstagram, faPaypal, faTwitter, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCheckCircle, faCircleUser, faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

import { MatToolbarModule } from '@angular/material/toolbar';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faPaypal,
  faTwitter,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCheckCircle,
  faCircleUser,
  faCreditCard,
} from '@fortawesome/free-regular-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

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
    QRCodeModule, //para poder usar QR dentro del modulo ciente (solo aplica a sus vistas)
    MatToolbarModule,
    FontAwesomeModule,
  ],
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
      faPowerOff
    );
  }
}

