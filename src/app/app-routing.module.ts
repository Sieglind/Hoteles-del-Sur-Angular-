import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';

const routes: Routes = [
  { path: '', component: HeaderComponent, outlet: 'nav', pathMatch: 'full' },
  { path: '', component: HeroComponent, outlet: 'header', pathMatch: 'full' },
  { path: '', component: LandingPageComponent, outlet: 'main', pathMatch: 'full' },
  { path: '', component: FooterComponent, outlet: 'footer', pathMatch: 'full' },
  { path: 'reservation', component: ReservationFormComponent, outlet: 'main' },
  { path: 'my-reservations', component: MyReservationsComponent, outlet: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
