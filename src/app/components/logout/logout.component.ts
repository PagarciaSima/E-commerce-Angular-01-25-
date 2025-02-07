import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private toastR: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.sessionStorageService.clear();
    this.toastR.success('Logged out from application', 'Logged out')
    this.router.navigate(['/user/login']);
  }

}
