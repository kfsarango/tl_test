import { TestBed } from '@angular/core/testing';

import { TodoLegalService } from './todo-legal.service';

describe('TodoLegalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoLegalService = TestBed.get(TodoLegalService);
    expect(service).toBeTruthy();
  });
});
