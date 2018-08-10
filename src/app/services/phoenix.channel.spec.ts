import { TestBed, inject } from '@angular/core/testing';

import { PhoenixService } from './phoenix.service';

describe('PhoenixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhoenixService]
    });
  });

  it('should be created', inject([PhoenixService], (service: PhoenixService) => {
    expect(service).toBeTruthy();
  }));
});
