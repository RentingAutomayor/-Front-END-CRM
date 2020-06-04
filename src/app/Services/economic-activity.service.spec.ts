import { TestBed } from '@angular/core/testing';

import { EconomicActivityService } from './economic-activity.service';

describe('EconomicActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EconomicActivityService = TestBed.get(EconomicActivityService);
    expect(service).toBeTruthy();
  });
});
