import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  constructor() { }

  private toggleFormSource = new Subject<void>();
  toggleForm$ = this.toggleFormSource.asObservable();

  emitToggleForm() {
    this.toggleFormSource.next();
  }
}
