import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthenticationService,
    private toastR: ToastrService,
    private sessionService: SessionStorageService
  ) {
    
  }

  ngOnInit(): void {
  }

  login() {
    let userDto = {
      username: this.username,
      password: this.password
    }
    this.authService.login(userDto).subscribe({
      next: (data) => {
        this.sessionService.setItem('token', data.token);
        this.sessionService.setItem('userID', data.id)
      }
    })
  }
}
