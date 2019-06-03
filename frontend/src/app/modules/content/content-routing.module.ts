import { BookingsComponent } from './pages/bookings/bookings.component';
import { EventsComponent } from './pages/events/events.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'bookings',
    component: BookingsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {
}

