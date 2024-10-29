import { Component } from '@angular/core';
import {EventBusService} from '../../services/event-bus.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  constructor(private eventBus: EventBusService) {}

  toggleReservationForm() {
    this.eventBus.emitToggleForm();
  }
}
