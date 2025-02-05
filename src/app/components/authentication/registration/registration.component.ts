import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/common/user-type';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  username: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  cellphone: string = '';
  password: string = '';
  userType: string = '';
 
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  registerUSer() {
    this.username = this.email;
    this.userType = UserType.USER;

    let user: User = {
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      cellPhone: this.cellphone,
      password: this.password,
      userType: UserType[this.userType as keyof typeof UserType]
    }
  }

}
