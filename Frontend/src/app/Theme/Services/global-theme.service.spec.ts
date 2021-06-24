import { TestBed } from '@angular/core/testing';

import { GlobalThemeService } from './global-theme.service';

describe('GlobalThemeService', () => {
  let service: GlobalThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
