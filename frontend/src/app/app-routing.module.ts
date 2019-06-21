import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './modules/auth/pages/login/login.component';
import { EventsComponent } from './modules/content/pages/events/events.component';
import { BookingsComponent } from './modules/content/pages/bookings/bookings.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'bookings',
    component: BookingsComponent,
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
