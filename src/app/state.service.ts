import { Injectable } from '@angular/core';
import { IWeeklyAvailability } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _duration: number;
  private _availability: IWeeklyAvailability;

  get duration() {
    return this._duration;
  }

  set duration(duration) {
    this._duration = Number(duration);
  }

  get availability() {
    return this._availability;
  }

  set availability(availability: IWeeklyAvailability) {
    this._availability = availability;
  }
}
