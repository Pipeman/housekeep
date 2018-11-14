import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StateService } from '../state.service';
import { ApiService, IWeeklyAvailability } from '../api.service';

export interface IHours {
  value: number;
  description: string;
}

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: [ './duration.component.scss' ]
})
export class DurationComponent implements OnInit {
  durationOptions: IHours[] = [];
  durationControl = new FormControl('', [ Validators.required ]);

  constructor(
    private stateService: StateService,
    private apiService: ApiService
  ) {
    for (let i = 2; i < 9; i = i + 0.5) {
      this.durationOptions.push({ value: i, description: `${i} hours` });
    }
  }

  private onAvailabilityReceived(availability: IWeeklyAvailability) {
    this.stateService.availability = availability;
  }

  ngOnInit() {
    this.durationControl.setValue(this.stateService.duration);
  }

  onChange(event) {
    this.stateService.duration = event.value;
  }

  onClickAvailability() {
    this.apiService.getAvailability(this.durationControl.value)
      .subscribe((data: IWeeklyAvailability) => this.onAvailabilityReceived(data));
  }
}
