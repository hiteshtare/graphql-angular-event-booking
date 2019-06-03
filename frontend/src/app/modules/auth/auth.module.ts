import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    // Angular
    CommonModule,
    // Auth routing
    AuthRoutingModule
  ],
  providers: []
})
export class AuthModule { }
