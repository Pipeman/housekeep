import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { StateService } from '../state.service';

export interface IHours {
  value: number;
  description: string;
}

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: [ './hours.component.scss' ],
  providers: [ StateService ]
})
export class HoursComponent implements OnInit {
  hoursOptions: IHours[] = [];
  hoursControl = new FormControl('', [Validators.required]);

  constructor(private stateService: StateService) {
    for (let i = 2; i < 9; i = i + 0.5) {
      this.hoursOptions.push({ value: i, description: `${i} hours` });
    }
  }

  ngOnInit() {
    this.hoursControl.setValue(this.stateService.duration);
  }

  onChange($event) {
    this.stateService.duration = $event.value;
  }
}
