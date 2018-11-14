import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatListModule } from '@angular/material';

import { AvailabilityComponent } from './availability.component';
import { IWeeklyAvailability } from '../api.service';
import { StateService } from '../state.service';

class StateServiceSpy {
  get duration() {
    return ;
  }
  set duration(duration) {}

  get availability() {
    return;
  }
  set availability(availability) {}
}

describe('AvailabilityComponent', () => {
  let component: AvailabilityComponent;
  let fixture: ComponentFixture<AvailabilityComponent>;
  let stateServiceSpy;
  let stateServiceGetAvailabilitySpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabilityComponent ],
      imports: [
        MatIconModule,
        MatListModule
      ]
    })
    .overrideComponent(AvailabilityComponent, {
      set: {
        providers: [
          { provide: StateService, useClass: StateServiceSpy }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityComponent);
    component = fixture.componentInstance;
    stateServiceSpy = fixture.debugElement.injector.get(StateService) as any;
    stateServiceGetAvailabilitySpy = spyOnProperty(stateServiceSpy, 'availability', 'get')
      .and.returnValue({
        weekBeginning: '2018-06-08',
        days: []
      } as IWeeklyAvailability);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
