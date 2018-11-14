import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DurationComponent } from './duration/duration.component';
import { AvailabilityComponent } from './availability/availability.component';

const routes: Routes = [
  {
    path: 'duration',
    component: DurationComponent,
  },
  {
    path: 'availability',
    component: AvailabilityComponent,
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
