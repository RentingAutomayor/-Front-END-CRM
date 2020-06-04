import { TestBed } from '@angular/core/testing';

import { KindOfDocumentService } from './kind-of-document.service';

describe('KindOfDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KindOfDocumentService = TestBed.get(KindOfDocumentService);
    expect(service).toBeTruthy();
  });
});
