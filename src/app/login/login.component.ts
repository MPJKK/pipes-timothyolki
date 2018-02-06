import {Component, OnInit} from '@angular/core';
import {MediaService} from '../services/media.service';
import {User} from '../models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {tokenize} from '@angular/compiler/src/ml_parser/lexer';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user = new User('', '');

  constructor(private mediaService: MediaService, private router: Router) {
  }

  login() {

    this.mediaService.login(this.user);

  }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.mediaService.getUserData(localStorage.getItem('token')).
          subscribe(response => {
            console.log(response);
            this.router.navigate(['front']);

          });
    }
  }

}
