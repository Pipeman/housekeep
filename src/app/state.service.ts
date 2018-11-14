import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _duration: number;

  get duration() {
    return this._duration;
  }

  set duration(duration) {
    this._duration = Number(duration);
  }
}
