import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from 'src/app/common/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;
  loginSuccess = false;

  user: User = new User();

  loginFormGroup: FormGroup;

  constructor(private authService: AuthService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      login: this.formBuilder.group({
        loginUsername: new FormControl('', [Validators.required]),
        loginPassword: new FormControl('', [Validators.required])
      })
    });
  }

  get loginUsername() {
    return this.loginFormGroup.get('login.loginUsername');
  }
  get loginPassword() {
    return this.loginFormGroup.get('login.loginPassword');
  }

  login() {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
    }

    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.authService.getUserByUsername(this.username).subscribe(
          data => {
            this.user = data;
            if (this.user.roles == "ADMIN") {
              this.invalidLogin = false;
              this.loginSuccess = true;
              localStorage.setItem('token', this.username);
              this.router.navigate(['/admin/products']);
            }
            else {
              this.invalidLogin = true;
              this.loginSuccess = false;
              // this.notification.error('Sorry you are not allowed to access this page', 'Please try again');
            }
          }
        ); 
      },
      () => {
        this.invalidLogin = true;
        this.loginSuccess = false;
      }
    );
  }

}
