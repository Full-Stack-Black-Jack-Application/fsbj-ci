import { Injectable } from '@angular/core';
import { url } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
}
