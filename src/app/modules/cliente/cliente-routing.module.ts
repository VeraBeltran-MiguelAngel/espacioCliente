import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDashboardComponent } from './components/cliente-dashboard/cliente-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteDashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: '', redirectTo: '/cliente/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
