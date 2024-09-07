import { TestBed } from '@angular/core/testing';

import { CountriesCitiesService } from './countries-cities.service';

describe('CountriesCitiesService', () => {
  let service: CountriesCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesCitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
