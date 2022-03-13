import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  username: string;
  role: string = "ADMIN";
  authorize: boolean;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  loginStatus() {
    this.username = localStorage.getItem('token');
    return this.username;
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigateByUrl('/');
  }

}
