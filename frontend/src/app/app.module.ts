import { MessageService } from 'primeng/components/common/messageservice';
import { UserDataService } from './shared/services/user-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './layout/header/header.component';

import { MenubarModule, ButtonModule, InputTextModule, } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';

import { NgxSpinnerModule } from 'ngx-spinner'; // Spinner Module

import { LoginComponent } from './modules/auth/pages/login/login.component';
import { EventsComponent } from './modules/content/pages/events/events.component';
import { BookingsComponent } from './modules/content/pages/bookings/bookings.component';

import { CustomToastService } from './shared/services/custom-toast.service';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { GlobalService } from './shared/services/global.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    EventsComponent,
    BookingsComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    NgxSpinnerModule
  ],
  providers: [
    UserDataService,
    GlobalService,
    CustomToastService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
