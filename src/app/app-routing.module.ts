import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DurationComponent } from './duration/duration.component';

const routes: Routes = [
  {
    path: 'duration',
    component: DurationComponent,
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
