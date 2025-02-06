import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  cellPhone: string = '';
  password: string = '';
  userType: string = '';
 
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
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
      cellPhone: this.cellPhone,
      password: this.password,
      userType: UserType[this.userType as keyof typeof UserType]
    }

    this.authenticationService.register(user).subscribe({
      next: () => {
        this.toastr.success('User registered successfully', "User registered");
        this.router.navigate(['/']);
      }, error: () => {
        this.toastr.error('The user could not be registered', "Error");
      }
    });
  }

}
