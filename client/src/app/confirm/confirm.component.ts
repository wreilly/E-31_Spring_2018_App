import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  error = true;
  errmsg = "This is a test.";
  pwdreset = true;

  constructor(private router: Router) {}

  ngOnInit() { }

  onSubmit(f:any): void {
    console.log('submit');
    if (f.password !== f.confirm) {
      this.errmsg = 'Passwords must match!'
      this.error = true;
    } else {
      // TBD
      this.router.navigate(['login']);
    }
    /*
    userName
    email
    password
    confirm
    */
  }

  onLogin(): void {
    this.router.navigate(['login']);
  }
}
