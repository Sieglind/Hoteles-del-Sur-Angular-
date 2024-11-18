import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { ReservationService } from './services/reservation.service';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ServiceComponent } from './components/services/service/service.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceFormComponent } from './components/service-form/service-form.component';
import { AddRoomsComponent } from './components/add-rooms/add-rooms.component';
import { ViewServiceComponent } from './components/view-service/view-service.component';
import { CommonModule } from '@angular/common';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ViewRoomComponent } from './components/view-room/view-room.component';
import { RoomListComponent } from './components/room-list/room-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    FooterComponent,
    LandingPageComponent,
    ReservationFormComponent,
    MyReservationsComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    RegisterComponent,
    ReservationComponent,
    ServiceComponent,
    ServicesComponent,
    ProfileComponent,
    ContactComponent,
    ServiceFormComponent,
    ContactComponent,
    AddRoomsComponent,
    ViewServiceComponent,
    ServiceListComponent,
    ViewRoomComponent,
    RoomListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    CommonModule
  ],
  providers: [ReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
