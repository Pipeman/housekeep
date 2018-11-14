import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { IWeeklyAvailability } from '../api.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  availability: IWeeklyAvailability;
  private duration: number;

  constructor(private stateService: StateService) {
  }

  ngOnInit() {
    this.availability = this.stateService.availability;
    this.duration = this.stateService.duration;
  }

  checkIfDurationFits(timeAvailability): boolean {
    const { start, end }: { start: string, end: string } = timeAvailability;
    const startFloat: number = this.getTimeInFloat(start);
    const endFloat: number = this.getTimeInFloat(end);
    const availableTimeSpan: number = endFloat - startFloat;

    return (this.duration - availableTimeSpan) > 0;
  }

  private getTimeInFloat(timeString: string): number {
    return timeString.split(':')
      .map((timeValue: string): number => Number(timeValue))
      .reduce((acc: number, timeValue: number, index: number): number => {
        const value = (index > 0) ? (timeValue / 60) : timeValue;

        return acc + value;
      }, 0);
  }
}
