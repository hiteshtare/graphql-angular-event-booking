import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Eventify'
      },
      {
        label: 'Login', icon: 'pi pi-fw pi-user', routerLink: '/login'
      },
      {
        label: 'Events', icon: 'pi pi-fw pi-calendar', routerLink: '/events'
      },
      {
        label: 'Bookings', icon: 'pi pi-fw pi-calendar-plus', routerLink: '/bookings'
      }
    ];
  }

}
