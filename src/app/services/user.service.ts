import { Injectable } from '@angular/core';
import { url } from 'src/environments/environment';
import { User } from '../models/user';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  useUrl: string = url + '/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json' }),
  }

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.useUrl, user, this.httpOptions);
  }

  private handleError(httpError: HttpErrorResponse): Observable<never> {

    if (httpError.error instanceof ErrorEvent) {
      console.log('an error occured: ', httpError.error.message);
    } else {
      console.error(`
        Backend returned code ${httpError.status}
        body was: ${httpError.error}
      `);
    }
  return throwError(() => new Error('Please try again'));
  }
}