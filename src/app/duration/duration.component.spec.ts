import { async, fakeAsync, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

import { DurationComponent } from './duration.component';
import { StateService } from '../state.service';
import { ApiService, IWeeklyAvailability } from '../api.service';
import { of } from 'rxjs';

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

describe('DurationComponent', () => {
  let component: DurationComponent;
  let fixture: ComponentFixture<DurationComponent>;
  let overlayContainer;
  let overlayContainerElement: HTMLElement;
  let titleElement: HTMLElement;
  let stateServiceSpy: StateServiceSpy;
  let stateServiceGetDurationSpy;
  let stateServiceGetAvailabilitySpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        BrowserAnimationsModule
      ]
    })
    .overrideComponent(DurationComponent, {
      set: {
        providers: [
          { provide: StateService, useClass: StateServiceSpy }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationComponent);
    stateServiceSpy = fixture.debugElement.injector.get(StateService) as any;
    stateServiceGetDurationSpy = spyOnProperty(stateServiceSpy, 'duration', 'get');
    stateServiceGetAvailabilitySpy = spyOnProperty(stateServiceSpy, 'availability', 'get');

    component = fixture.componentInstance;
    spyOn(component, 'onChange').and.callThrough();
    spyOn(component, 'onClickAvailability').and.callThrough();
    
    fixture.detectChanges();
    titleElement = fixture.debugElement.query(By.css('h4')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a question in the title', () => {
    expect(titleElement.textContent).toBe('How long will you need the cleaner for?');
  });

  describe('select', () => {
    let trigger: HTMLElement;
    let options: NodeListOf<HTMLElement>;
    let select: HTMLElement;

    beforeEach(fakeAsync(() => {
      fixture.detectChanges();

      select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
      trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
      trigger.click();
      fixture.detectChanges();

      options = overlayContainerElement.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    }));

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should call the StateService to get the duration value', () => {
      expect(stateServiceGetDurationSpy).toHaveBeenCalled();
    });

    it('should contain aria label', () => {
      expect(select.getAttribute('aria-label')).toBe('Hours you need the cleaner');
    });

    it('should contain placeholder', () => {
      expect(select.getAttribute('placeholder')).toBe('Hours');
    });

    it('should be required', () => {
      expect(select.getAttribute('required')).toBe('');
    });

    it('should contain as many options as the durationOptions', () => {
      expect(options.length).toBe(component.durationOptions.length);
    });

    it('should contain the values set by the durationOptions', () => {
      options.forEach((option: HTMLElement, index) => {
        expect(option.getAttribute('ng-reflect-value')).toBe(component.durationOptions[index].value.toString());
        expect(option.textContent).toBe(component.durationOptions[index].description);
      });
    });

    describe('when no value is selected', () => {
      let error: HTMLElement;

      beforeEach(() => {
        trigger.click();
        fixture.detectChanges();

        error = fixture.debugElement.query(By.css('mat-error')).nativeElement as HTMLElement;
      });

      it('should display an error when no value is selected', () => {
        expect(error.textContent).toBe('Please select a value from the dropdown');
      });
    });

    describe('when changing selected value', () => {
      let stateServiceSetDurationSpy;

      beforeEach(() => {
        stateServiceSetDurationSpy = spyOnProperty(stateServiceSpy, 'duration', 'set');
        options[3].click();
        fixture.detectChanges();
      });

      it('should call onChange', () => {
        expect(component.onChange).toHaveBeenCalled();
      });

      it('should set the status of the service duration', () => {
        expect(stateServiceSetDurationSpy).toHaveBeenCalledWith(component.durationOptions[3].value);
      });
    });
  });

  fdescribe('button', () => {
    let button: HTMLElement;
    let apiServiceSpy: ApiService;
    let apiServiceGetAvailabilitySpy;
    let availabilityMock: IWeeklyAvailability;

    beforeEach(fakeAsync(() => {
      availabilityMock = {
        weekBeginning: '2018-06-08',
        days: [
          {
            day: '2018-06-08',
            availability: [
              {
                start: '12:00:00',
                end: '16:00:00'
              },
              {
                start: '19:00:00',
                end: '22:00:00'
              }
            ]
          },
          {
            day: '2018-06-09',
            availability: [
              {
                start: '14:00:00',
                end: '12:00:00'
              }
            ]
          }
        ]
      };
      apiServiceSpy = fixture.debugElement.injector.get(ApiService) as any;
      apiServiceGetAvailabilitySpy = spyOn(apiServiceSpy, 'getAvailability').and.returnValue(of(availabilityMock));

      fixture.detectChanges();

      button = fixture.debugElement.query(By.css('[qa=duration__button]')).nativeElement;
    }));

    it("should be present", () => {
      expect(button).toBeTruthy();
    });

    it("should have the correct text", () => {
      expect(button.textContent).toBe('Check availability');
    });

    describe("when no duration was selected", () => {
      it("should be disabled", () => {
        expect(button.getAttribute('disabled')).toBe('');
      });

      describe("when clicked", () => {
        beforeEach(() => {
          button.click();
        });
        
        it("should not call onClickAvailability", () => {
          expect(component.onClickAvailability).not.toHaveBeenCalled();
        });
      });
    });

    describe("when a duration is set", () => {
      let stateServiceSetAvailabilitySpy;

      beforeEach(() => {
        stateServiceSetAvailabilitySpy = spyOnProperty(stateServiceSpy, 'availability', 'set');
        component.durationControl.setValue(3);
        fixture.detectChanges();
      });

      it("should be disabled", () => {
        expect(button.getAttribute('disabled')).toBeNull();
      });

      describe("when clicked", () => {
        beforeEach(() => {
          button.click();
          fixture.detectChanges();
        });
        
        it("should call the onClickAvailability", () => {
          expect(component.onClickAvailability).toHaveBeenCalled();
        });
  
        it("should call availability service with the selected value", () => {
          expect(apiServiceGetAvailabilitySpy).toHaveBeenCalledWith(component.durationControl.value);
        });

        it("should call state service to set the availability", () => {
          expect(stateServiceSetAvailabilitySpy).toHaveBeenCalledWith(availabilityMock);
        });
      });
    });
  });
});
