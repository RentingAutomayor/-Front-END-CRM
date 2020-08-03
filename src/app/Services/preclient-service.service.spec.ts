import { TestBed } from '@angular/core/testing';

import { PreclientServiceService } from './preclient-service.service';

describe('PreclientServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreclientServiceService = TestBed.get(PreclientServiceService);
    expect(service).toBeTruthy();
  });
});
