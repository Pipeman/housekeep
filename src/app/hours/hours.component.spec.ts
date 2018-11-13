import { async, fakeAsync, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';

import { HoursComponent } from './hours.component';
import { StateService } from '../state.service';

class StateServiceSpy {
  get duration() {
    return ;
  }

  set duration(duration) {}
}

describe('HoursComponent', () => {
  let component: HoursComponent;
  let fixture: ComponentFixture<HoursComponent>;
  let overlayContainer;
  let overlayContainerElement: HTMLElement;
  let titleElement: HTMLElement;
  let stateServiceSpy: StateServiceSpy;
  let stateServiceGetDurationSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoursComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        BrowserAnimationsModule
      ]
    })
    .overrideComponent(HoursComponent, {
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
    fixture = TestBed.createComponent(HoursComponent);
    stateServiceSpy = fixture.debugElement.injector.get(StateService) as any;
    stateServiceGetDurationSpy = spyOnProperty(stateServiceSpy, 'duration', 'get');

    component = fixture.componentInstance;
    spyOn(component, 'onChange').and.callThrough();

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

    it('should contain as many options as the hoursOptions', () => {
      expect(options.length).toBe(component.hoursOptions.length);
    });

    it('should contain the values set by the hoursOptions', () => {
      options.forEach((option: HTMLElement, index) => {
        expect(option.getAttribute('ng-reflect-value')).toBe(component.hoursOptions[index].value.toString());
        expect(option.textContent).toBe(component.hoursOptions[index].description);
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
        expect(stateServiceSetDurationSpy).toHaveBeenCalledWith(component.hoursOptions[3].value);
      });
    });
  });
});
