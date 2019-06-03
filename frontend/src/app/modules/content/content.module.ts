import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { EventsComponent } from './pages/events/events.component';


@NgModule({
  declarations: [
    BookingsComponent,
    EventsComponent
  ],
  imports: [
    // Angular
    CommonModule,
    // Content routing
    ContentRoutingModule
  ],
  providers: []
})
export class ContentModule { }
