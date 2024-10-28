import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeroComponent} from './components/hero/hero.component';

const routes: Routes = [
  { path: '', component: HeaderComponent , outlet: 'nav' },
  { path: '', component: HeroComponent , outlet: 'header' },
  { path: '', component: LandingPageComponent , outlet: 'main' },
  { path: '', component: FooterComponent , outlet: 'footer' },
  { path: 'reservation', component: ReservationFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
