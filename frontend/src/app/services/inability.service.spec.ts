import { TestBed } from '@angular/core/testing';

import { InabilityService } from './inability.service';

describe('InabilityService', () => {
  let service: InabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
