import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {MyReservationsComponent} from './components/my-reservations/my-reservations.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ReservationComponent} from './components/reservation/reservation.component';
import {ServicesComponent} from './components/services/services.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ContactComponent} from './components/contact/contact.component'; // Importar ContactComponent
import { ServiceFormComponent } from './components/service-form/service-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'reservations', component: MyReservationsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reservations/:id', component: ReservationComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'services/:id', component: ServiceFormComponent},
  {path: 'profile' , component: ProfileComponent},
  {path: 'contact', component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
