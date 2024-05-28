import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PaginationServiceService } from 'src/app/pagination-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  usersDatalocal: any = localStorage.getItem("user");

constructor(private http:HttpClient){
  if (this.usersDatalocal && this.usersDatalocal.length > 0) {
    var userid = JSON.parse(this.usersDatalocal!).id;
    var token = JSON.parse(this.usersDatalocal!).usertoken;
    const url=`http://corzacademy.runasp.net/api/Users/get all users/${token}/${userid}`
  this.http.get(url).subscribe((response:any)=>{
    this.data=response
    this.originalData=response
    console.log(this.data)
  })}
}

  data: any[]=[];
  originalData:any
  currentPage = 1;
  pageSize = 10;

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  get currentPageData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.data.length);
    return this.data.slice(startIndex, endIndex);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  serachUser(value:string){
    this.data = this.originalData.filter((m:any) => m.userName.includes(value));
  }
}