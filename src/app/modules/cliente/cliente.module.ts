import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteDashboardComponent } from './components/cliente-dashboard/cliente-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MiMembresiaComponent } from './components/mi-membresia/mi-membresia.component';


@NgModule({
  declarations: [
    ClienteDashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PerfilComponent,
    MiMembresiaComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
