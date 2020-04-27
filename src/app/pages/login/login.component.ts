import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error_message = ''
  public loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    public router: Router,
    public dialog: MatDialog,
    private dashboardservice: DashboardService
  ) {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('loginpage');
  }

  ngOnInit(): void {
  }

  login() {
    const user = {
      'username': this.loginForm.value.username,
      'password': this.loginForm.value.password
    };
    this.dashboardservice.login(user).subscribe((data)=> {
      const userInfo = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      localStorage.setItem('user', JSON.stringify(userInfo))
      this.router.navigateByUrl('/home');
      this.error_message = ''
    }, error => {
      this.error_message = error.error
    })
  }

}
