import { Injectable } from '@angular/core';
import { url } from '../../environments/environment'
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
export class AuthService {

  loginUrl = url + '/login'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) {}

  login(email: string, pswd: string) {

    const payload = {email, pswd}

    return this.http.post<any>(this.loginUrl, payload, {observe: 'response'})
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

    return throwError(() => new Error(`Please try again`));
  }
}
