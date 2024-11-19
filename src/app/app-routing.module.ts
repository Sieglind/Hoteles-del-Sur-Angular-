import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {MyReservationsComponent} from './components/my-reservations/my-reservations.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ReservationComponent} from './components/reservation/reservation.component';
import {ServicesComponent} from './components/services/services.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ContactComponent} from './components/contact/contact.component';
import {ServiceFormComponent} from './components/service-form/service-form.component';
import {AddRoomsComponent} from './components/add-rooms/add-rooms.component';
import {ViewServiceComponent} from './components/view-service/view-service.component';
import {ServiceListComponent} from './components/service-list/service-list.component';
import {ViewRoomComponent} from './components/view-room/view-room.component';
import {RoomListComponent} from './components/room-list/room-list.component';
import {ReservationListComponent} from './components/reservation-list/reservation-list.component';
import {ReservationEditComponent} from './components/reservation-edit/reservation-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'reservations', component: MyReservationsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reservations/:id', component: ReservationComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'services/list', component: ServiceListComponent},
  {path: 'services/list/add', component: ServiceFormComponent},
  {path: 'services/:id', component: ViewServiceComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'rooms/list', component: RoomListComponent},
  {path: 'rooms/list/add', component: AddRoomsComponent},
  {path: 'rooms/:id', component: ViewRoomComponent},
  {path: 'reservations/list', component: ReservationListComponent},
  {path: 'reservations/:id', component: ReservationComponent},
  {path: 'reservations/edit/:id', component: ReservationEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
