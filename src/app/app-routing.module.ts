import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HoursComponent } from './hours/hours.component';

const routes: Routes = [
  {
    path: 'duration',
    component: HoursComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'duration'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
