import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {ReservationFormComponent} from './components/reservation-form/reservation-form.component';
import {MyReservationsComponent} from './components/my-reservations/my-reservations.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'reservations', component: MyReservationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
