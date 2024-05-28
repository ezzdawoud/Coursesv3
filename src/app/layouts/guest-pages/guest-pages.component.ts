import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-guest-pages',
  templateUrl: './guest-pages.component.html',
  styleUrls: ['./guest-pages.component.css']
})
export class GuestPagesComponent implements OnInit {

  isLogin = false;

  usersDatalocal: any = localStorage.getItem("user");
  userData: any = {};

  constructor(private authService: AuthenticationService, private loader: LoaderService, private router: Router, private Http: ServicesService) {
    
  }






  ngOnInit() {
    if (this.usersDatalocal && this.usersDatalocal.length > 0) {
      this.isLogin = true;
      var id = JSON.parse(this.usersDatalocal).id;
      var token = JSON.parse(this.usersDatalocal).usertoken;
      this.loader.showLoader();
      this.Http.getUserInformation(id, token).subscribe(
        (response) => {
          this.userData = response
          this.loader.hideLoader()
        },
        (error) => {
          localStorage.removeItem("user")
          this.loader.hideLoader();
          this.router.navigate(["/signin"])

        }
      )
    }
    this.loader.showLoader()
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLogin = isAuthenticated;
    });
    this.loader.showLoader();
    this.authService.isAdmin$.subscribe(isAdmin => {
      if (isAdmin) {
        this.loader.hideLoader();
        this.router.navigate(["/admin"])
      }
      else {
        this.loader.hideLoader();
      }
    })
    this.loader.showLoader();
    this.authService.isTeacher$.subscribe(isTeacher => {
      if (isTeacher) {
        this.loader.hideLoader();
        this.router.navigate(["/teacher"])
      }
      else {
        this.loader.hideLoader();
      }
    })
  }

  logout() {
    this.authService.logout();
  }


}