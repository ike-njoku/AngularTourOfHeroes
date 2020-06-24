import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { Page404Component } from './page404/page404.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {path: 'detail/:id', component: HeroDetailsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'heroes' , component: HeroesComponent},

  {path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
