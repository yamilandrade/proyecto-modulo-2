import { TestBed } from '@angular/core/testing';

import { ApiToDosService } from './api-to-dos.service';

describe('ApiToDosService', () => {
  let service: ApiToDosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiToDosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
