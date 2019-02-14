import { TestBed, getTestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('UserService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should return an Observable<User[]>', () => {
    const service: UserService = TestBed.get(UserService);
    const dummyUsers = [{ name: 'John' }, { name: 'Doe' }];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should return an Error', () => {
    const service: UserService = TestBed.get(UserService);
    const dummyError = { errorCode: 'error' };

    service.getUsersWithError().subscribe(users => {
      expect(users).toEqual(dummyError);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users' + 'withError'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyError);
  });
});
