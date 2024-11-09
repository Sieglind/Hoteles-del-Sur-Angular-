import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Service } from '../../models/service.model';
import {EventBusService} from '../../services/event-bus.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{
  services : Service[] | undefined ;
  selectedService: Service | undefined;

  constructor(
    private servicesService : ServicesService,
    private eventBus : EventBusService
    ) {}

  ngOnInit(): void {
      this.servicesService.getAllServices().then(
        foundServices => this.services = foundServices
      ).catch()
  }

  setSelectedService(service: Service) {
    if (!this.selectedService) {
      this.selectedService = service;
    } else {
      this.eventBus.emitServiceChange(service);
    }
  }
}
