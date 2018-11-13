import { Injectable } from '@angular/core';

import availabilityMock from '../mocks/availability';
import bookingMock from '../mocks/booking';

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

  getAvailability(duration): IWeeklyAvailability {
    if (!duration) {
      throw new Error('There is no duration specified');
    }
    
    return availabilityMock;
  }

  book(booking: IBookingRequest): IBookingResponse {
    if (!booking) {
      throw new Error('There is no booking specified');
    }

    return bookingMock;
  }
}
