import { TestBed } from '@angular/core/testing';

import { PreRequestServiceService } from './pre-request-service.service';

describe('PreRequestServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreRequestServiceService = TestBed.get(PreRequestServiceService);
    expect(service).toBeTruthy();
  });
});
