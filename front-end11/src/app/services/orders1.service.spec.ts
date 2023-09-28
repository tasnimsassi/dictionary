import { TestBed } from '@angular/core/testing';

import { Orders1Service } from './orders1.service';

describe('Orders1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Orders1Service = TestBed.get(Orders1Service);
    expect(service).toBeTruthy();
  });
});
