import { TestBed } from '@angular/core/testing';

import { MicrofonoService } from './microfono.service';

describe('MicrofonoService', () => {
  let service: MicrofonoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrofonoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
