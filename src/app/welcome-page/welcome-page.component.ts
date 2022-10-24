import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public snackbar: MatSnackBar) { }
  ngOnInit(): void {
  }

  /**
   * Dialog to display the UserRegistrationComponent
   * @function openUserRegistrationDialog
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Dialog to display the UserLoginComponent
   * @function openUserLoginDialog
   */
  openUserLoginDialog(): void {
      this.dialog.open(UserLoginFormComponent, {
        width: '280px'
      });
  }
}