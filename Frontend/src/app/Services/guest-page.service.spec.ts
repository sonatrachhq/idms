import { TestBed } from '@angular/core/testing';

import { GuestPageService } from './guest-page.service';

describe('GuestPageService', () => {
  let service: GuestPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
