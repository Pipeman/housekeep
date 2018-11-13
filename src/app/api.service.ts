import { Injectable } from '@angular/core';

import availabilityMock from '../mocks/availability';
import bookingMock from '../mocks/booking';
import { Observable, of, throwError } from 'rxjs';

export interface IWeeklyAvailability {
  weekBeginning: string;
  days: IDay[];
}

export interface IDay {
  day: string;
  availability: IDailyAvailability[];
}

export interface IDailyAvailability {
  start: string;
  end: string;
}

export interface IBookingRequest extends IDailyAvailability {
  day: string;
}

export interface IBookingResponse {
  cleanerName: string;
  price: string;
  currency: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getAvailability(duration): Observable<IWeeklyAvailability> {
    if (!duration) {
      return throwError(new Error('There is no duration specified'));
    }

    return of(availabilityMock);
  }

  book(booking: IBookingRequest): Observable<IBookingResponse> {
    if (!booking) {
      return throwError(new Error('There is no booking specified'));
    }

    return of(bookingMock);
  }
}
