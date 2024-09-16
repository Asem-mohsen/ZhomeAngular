import { TestBed } from '@angular/core/testing';

import { InteriorDesignService } from './interior-design.service';

describe('InteriorDesignService', () => {
  let service: InteriorDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteriorDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
