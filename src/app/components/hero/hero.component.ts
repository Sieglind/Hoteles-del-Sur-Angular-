import { Component } from '@angular/core';
import {EventBusService} from '../../services/event-bus.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  constructor(private eventBus: EventBusService,private router: Router) {}

  toggleReservationForm() {
    this.eventBus.emitToggleForm();
  }

  currentUrlIsHome(): boolean {
    return this.router.url ==  '/home';
  }
}
