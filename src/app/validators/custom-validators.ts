import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import {PexelsService} from '../services/pexels.service';
import {catchError, map, Observable, of} from 'rxjs';
import {UserService} from "../services/user.service";
import {RoomService} from '../services/room.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {

  constructor() {
  }

  static checkInValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && this.dateIsBeforeToday(control.value)) {
        return {'checkInInvalid': 'La fecha de check-in debe ser posterior a la fecha actual.'};
      }
      return null;
    };
  }

  static checkOutValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return {'checkOutInvalid': 'Falta Fecha Checkin'}
      }
      const checkInDate = control.parent.get('checkInDate')?.value;
      const checkOutDate = control.value;
      if (checkInDate && checkOutDate && this.checkoutIsBeforeCheckIn(checkInDate,checkOutDate)) {
        return {'checkOutInvalid': 'La fecha de check-out debe ser posterior a la de check-in.'};
      }
      return null;
    };
  }

  static getToday() {
    let today = new Date();
    today.setHours(0, 0, 0, 0,);
    return today;
  }

  static formatDate(date: Date) {
    return new Date(date + 'T00:00:00');
  }

  static dateIsBeforeToday(date: Date) {
    return this.formatDate(date) < this.getToday()
  }

  static checkoutIsBeforeCheckIn(checkIn: Date, checkOut: Date): boolean {
    return this.formatDate(checkIn) > this.formatDate(checkOut)
  }

  static roomExists(roomService: RoomService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      } else {
        return roomService.roomExists(control.value).pipe(
          map(result => result ? {roomExists: {value: control.value}} : null),
          catchError(() => of(null))
        )
      }
    };
  }

  static collectionExist(pexelsService: PexelsService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if (control.value == '') {
        return null as any;
      }
      return pexelsService.collectionExists(control.value).pipe(
        map(result => !result ? {collectionExists: {value: control.value}} : null),
        catchError(() => of(null))
      )
    };
  }

  static imageUrlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const urlPattern = /^https:\/\/images\.pexels\.com\/photos\/\d{6}.*/
      return urlPattern.test(control.value) ? null : {invalidUrl: true};
    };
  }


  static emailAlreadyExists(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return userService.emailAlreadyExists(control.value).pipe(
        map(result => result ? {emailAlreadyExists: {value: control.value}} : null),
        catchError(() => of(null))
      );
    };
  }

}
