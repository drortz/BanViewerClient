import { BanInfoComponent } from './ban-info/ban-info.component';
import { HomeComponent } from './home/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'banviewer/details', component: HomeComponent},
  {path: 'banviewer/info', component: BanInfoComponent},
  {path: '**', redirectTo: '/banviewer/details', pathMatch: 'full'},
  {path: '', redirectTo: '/banviewer/details', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
