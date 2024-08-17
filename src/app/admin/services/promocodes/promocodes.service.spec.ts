import { TestBed } from '@angular/core/testing';

import { PromocodesService } from './promocodes.service';

describe('PromocodesService', () => {
  let service: PromocodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromocodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
