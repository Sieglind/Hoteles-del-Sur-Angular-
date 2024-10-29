import {Component, OnInit} from '@angular/core';
import {EventBusService} from '../services/event-bus.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor(private eventBus: EventBusService) {
  }

  showReservationForm: boolean = false;

  ngOnInit() {
    this.eventBus.toggleForm$.subscribe(() => {
      this.showReservationForm = !this.showReservationForm;
    });
  }
}
