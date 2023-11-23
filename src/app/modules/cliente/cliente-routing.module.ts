import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDashboardComponent } from './components/cliente-dashboard/cliente-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MiMembresiaComponent } from './components/mi-membresia/mi-membresia.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { GimnasioComponent } from './components/gimnasio/gimnasio.component';
import { DetallesComponent } from './components/detalles/detalles.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteDashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'gimnasio/:id', component: GimnasioComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'membresia', component: MiMembresiaComponent },
      { path: 'pagos', component: PagosComponent },
      { path: 'detalles/:id', component: DetallesComponent },
      { path: '', redirectTo: '/cliente/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
