import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Login} from '../models/login';

@Injectable()
export class MediaService {

  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  logged = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  getNew() {

    return this.http.get(this.apiUrl + '/media?start=01&limit=10');
  }

  newUser(user) {
    return this.http.post(this.apiUrl + '/users', user);
  }

  login(user) {
    this.http.post<Login>(this.apiUrl + '/login', user).subscribe(response => {
      // kaikki ok -> front
      console.log(response);
      localStorage.setItem('token', response.token);
      this.router.navigate(['front']);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      // ei onnistu -> login
      this.router.navigate(['login']);
    });
  }

  getUserData(token) {
    const options = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.get(this.apiUrl + '/users/user', options);

  }

  uploadMedia(token, fd) {
    const options = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.post(this.apiUrl + '/media', fd, options);
  }

}
