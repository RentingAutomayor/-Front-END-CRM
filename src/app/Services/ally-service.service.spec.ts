import { TestBed } from '@angular/core/testing';

import { AllyServiceService } from './ally-service.service';

describe('AllyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllyServiceService = TestBed.get(AllyServiceService);
    expect(service).toBeTruthy();
  });
});
