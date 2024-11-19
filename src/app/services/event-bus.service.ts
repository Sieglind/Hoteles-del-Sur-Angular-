import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Service} from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  constructor() { }

  private toggleFormSource = new Subject<void>();
  toggleForm$ = this.toggleFormSource.asObservable();

  private changeServiceSource = new Subject<Service>();
  changeService$ = this.changeServiceSource.asObservable();


  emitToggleForm() {
    this.toggleFormSource.next();
  }

  emitServiceChange(service:Service){
    this.changeServiceSource.next(service);
  }
}
