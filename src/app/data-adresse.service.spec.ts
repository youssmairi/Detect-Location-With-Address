import { TestBed } from '@angular/core/testing';

import { DataAdresseService } from './data-adresse.service';

describe('DataAdresseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataAdresseService = TestBed.get(DataAdresseService);
    expect(service).toBeTruthy();
  });
});
