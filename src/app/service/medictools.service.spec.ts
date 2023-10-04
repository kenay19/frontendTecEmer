import { TestBed } from '@angular/core/testing';

import { MedictoolsService } from './medictools.service';

describe('MedictoolsService', () => {
  let service: MedictoolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedictoolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
