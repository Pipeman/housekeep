import { TestBed } from '@angular/core/testing';

import { ApiService, IBookingRequest } from './api.service';

import availabilityMock from '../mocks/availability';
import bookingMock from '../mocks/booking';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  describe('getAvailability()', () => {
    let service: ApiService;
    beforeEach(() => {
      service = TestBed.get(ApiService);
    });

    it('should be defined', () => {
      expect(service.getAvailability).toBeDefined();
    });

    it('should throw when an invalid duration is passed', () => {
      service.getAvailability(null).subscribe(() => {}, (err: any) => {
        expect(err).toEqual(new Error('There is no duration specified'));
      });
    });

    it('should return the availability mock', () => {
      service.getAvailability({}).subscribe((data: any) => {
        expect(data).toEqual(availabilityMock);
      });
    });
  });

  describe('book()', () => {
    let service: ApiService;
    beforeEach(() => {
      service = TestBed.get(ApiService);
    });

    it('should be defined', () => {
      expect(service.book).toBeDefined();
    });

    it('should throw when an invalid booking is passed', () => {
      service.book(null).subscribe(() => {}, (err: any) => {
        expect(err).toEqual(new Error('There is no booking specified'));
      });
    });

    it('should return the booking response mock', () => {
      const bookingRequest: IBookingRequest = {
        day: '',
        start: '',
        end: '',
      };
      service.book(bookingRequest).subscribe((data: any) => {
        expect(data).toEqual(bookingMock);
      });
    });
  });
});
