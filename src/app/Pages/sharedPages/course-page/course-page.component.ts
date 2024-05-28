import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent {
  idOfCourse: any = 0;
  usersDatalocal: any = localStorage.getItem("user");
  courseDetile: any = { date: "" };
  isLoading = true;
  isRating = false;
  stars: number[] = [1, 2, 3, 4, 5]; // Array to represent the number of stars
  rating: number = 5;
  title = [
    { "value": 1, "label": "Poor 😞" },
    { "value": 2, "label": "Fair 🙂" },
    { "value": 3, "label": "Good 😊" },
    { "value": 4, "label": "Very Good 😄" },
    { "value": 5, "label": "Excellent 😁" }
  ]
  ratingLabel = "";
  // Current rating
  // Method to set the rating when a star is clicked
  setRating(rating: number): void {
    this.rating = rating;
    this.ratingLabel = this.title[rating - 1].label;
    console.log(rating)
  }

  constructor(private id: ActivatedRoute, private auth: AuthenticationService, private router: Router, private service: ServicesService,private Http:HttpClient) {

    this.isLoading = true;
    this.id.params.subscribe(data => { this.idOfCourse = data 
    if (this.auth.isAuthenticated()) {
      if (this.usersDatalocal && this.usersDatalocal.length > 0) {
        var userid = JSON.parse(this.usersDatalocal!).id;
        var token = JSON.parse(this.usersDatalocal!).usertoken;
        this.service.getUserRole(userid, token).subscribe((response) => {
          if (response[0] == "users") {
            this.service.getcourseDeitle(this.idOfCourse['id']).subscribe((response) => { this.courseDetile = response }, (error) => { })
            this.isLoading = false;

          }
          else {
            this.isLoading = false;
            this.router.navigate(["/"])
          }
        },
          (error) => {
            this.isLoading = false;
            this.router.navigate(["/"])
          })

      }



    }
    else {
      console.log("s")
      this.service.getcourseDeitle(this.idOfCourse['id']).subscribe(
        (response) => { this.courseDetile = response;console.log("course") },
         (error) => { this.router.navigate(["/courses"])})
      this.isLoading = false;
    }
  })

  }

  checkRatng(){
    if (this.usersDatalocal && this.usersDatalocal.length > 0) {
      var userid = JSON.parse(this.usersDatalocal!).id;
      var token = JSON.parse(this.usersDatalocal!).usertoken;
    const url = `https://localhost:7225/api/courses/checkRating/${token}/${userid}/${this.idOfCourse.id}`;
    this.Http.post(url, {}).subscribe(
      (response:any) => {
        if(response!=null){
        this.rating=response.rating;
        this.ratingLabel="You've already rated this course here's where you may edit."
        this.isRating=true;
      }
      else{
        this.rating=0;
        this.isRating=true;
      }
      },
      (error) => {
        if (error.status === 204) {

        } else {
          Swal.fire({
            title: "Error",
            text: error.error,
            icon: "error"
          });        }
      }
    );
  
  }
  else{
    this.router.navigate(["/signin"])

  }
  }
  ratingMethod() {
    if (this.usersDatalocal && this.usersDatalocal.length > 0) {
      var userid = JSON.parse(this.usersDatalocal!).id;
      var token = JSON.parse(this.usersDatalocal!).usertoken;
      console.log(this.rating)
      if (this.rating < 0) {
        this.ratingLabel = "you must Rating"
      }
      else {
        console.log(this.idOfCourse)
        const url = `https://localhost:7225/api/courses/updateCourseRating/${token}/${userid}/${this.idOfCourse.id}/${this.rating}`;
        this.Http.post(url,{}).subscribe((response:any) => {
          Swal.fire({
            title: "Success",
            text: response.message,
            icon: "success"
          }).then(()=>{
            this.isRating=false
          });        },
      (error)=>{
        console.log(error)
      });
      }
    }
    else {
      this.router.navigate(["/signin"])
    }
  }

  checkCourse(){
    if (this.usersDatalocal && this.usersDatalocal.length > 0) {
      var userid = JSON.parse(this.usersDatalocal!).id;
      var token = JSON.parse(this.usersDatalocal!).usertoken;
    this.service.checkCourse(userid, token, this.idOfCourse.id).subscribe((response) => {
      this.router.navigate(['/Lessons', this.idOfCourse.id,1]);
    },(erorr)=>{
      this.showCardInputAlert()
    }
  
  )
  }
  else{
    this.router.navigate(["/signin"])
  }

}
async showCardInputAlert() {
  const { value: cardNumber } = await Swal.fire({
    title: 'Enter Card Number',
    input: 'text',
    inputLabel: 'Your card number',
    inputPlaceholder: 'Enter your 12-digit card number',
    showCancelButton: true,
    inputAttributes: {
      maxlength: '12',
      pattern: '\\d*',
      inputmode: 'numeric'
    },
    inputValidator: (value) => {
      if (!value) {
        return 'You need to enter a card number!';
      } else if (!/^\d{12}$/.test(value)) {
        return 'Card number must be exactly 12 digits!';
      }
      return null;
    }
  });

  if (cardNumber) {
    console.log(cardNumber)
    if (this.usersDatalocal && this.usersDatalocal.length > 0) {
      var userid = JSON.parse(this.usersDatalocal!).id;
      var token = JSON.parse(this.usersDatalocal!).usertoken;
      const cardNumberInt = parseInt(cardNumber, 10);
    const url = `https://localhost:7225/api/Enrollment/Enrollment/${token}/${userid}/${this.idOfCourse.id}/${cardNumber}`;
     this.Http.post(url,{}).subscribe((response:any)=>{
    Swal.fire(response.message);
    },(error)=>{
      Swal.fire(""+error.error);


    }
  
  );
    


  }
}
}

}
