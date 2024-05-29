import { HttpClient } from '@angular/common/http';
import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { Pipe, PipeTransform } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lessons-page',
  templateUrl: './lessons-page.component.html',
  styleUrls: ['./lessons-page.component.css']
})

export class LessonsPageComponent implements PipeTransform{
  usersDatalocal: any = localStorage.getItem("user");
  idOfCourse: any;
  idOfLessons: any;
  isLoading = false;
  lessonsDate: any = { lesson: { url: "" },teacherInfoApi:{}}; 

  videourl="";
thereIsNoLessons=false;
comments:any
userid="";
  constructor(private services: ServicesService, private router: Router, private parms: ActivatedRoute, private http: HttpClient,private sanitizer: DomSanitizer) {
    console.log("heelloo")
    this.isLoading = true;
    this.parms.params.subscribe((parms: any) => {
      this.idOfCourse = parms.courseId;
      this.idOfLessons = parms.lessonsId;
    
    if (this.usersDatalocal && this.usersDatalocal.length > 0) {
      var userid = JSON.parse(this.usersDatalocal!).id;
      this.userid=userid;
      var token = JSON.parse(this.usersDatalocal!).usertoken;
      const requset={
        "courseId":this.idOfCourse,
        "lessonsNumber":this.idOfLessons,
        "id":userid,
        "token":token
      }
      this.services.checkCourse(userid, token, this.idOfCourse).subscribe((response) => {
        const url = `https://corzacademy.runasp.net/api/lessons/getlessons`;
        this.http.post(url, requset).subscribe((response) => {
          this.lessonsDate = response;
          this.videourl = 'https://player.cloudinary.com/embed/?public_id=' + this.lessonsDate.lesson.url + '&cloud_name=dolmafyz2&player[controls]=true&player[showLogo]=false&player[fluid]=true';
      
          const url = `https://corzacademy.runasp.net/api/lessons/get lessons comment`;
          this.http.post(url, requset).subscribe((response) => {
            this.comments=response;
            console.log(this.comments)
          },(error)=>{})
          this.thereIsNoLessons=false;

        }, (error) => {
          if(this.idOfLessons==1){
            this.thereIsNoLessons=true;
          }
          else{
            this.thereIsNoLessons=false;
            this.router.navigate(["/Lessons",this.idOfCourse,1])
          }
          this.isLoading = false
        })
      }, (error) => {
        this.isLoading = false
        this.router.navigate(["/course",this.idOfCourse])
      }

      )
    }
  })
  }
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

  sidebarActive = false;

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }
  toggleCollapse(collapseId: string) {
    const collapseElement = document.getElementById(collapseId);
    if (collapseElement) {
      collapseElement.classList.toggle('show');
    }
  }
  goBack() {
    if (this.idOfLessons > 1) {
      const prevLessonId = this.idOfLessons - 1;
      // Navigate to the previous lesson route
      this.router.navigate(['/Lessons', this.idOfCourse,prevLessonId]);
    }
  }
commentsCheckerLabel="";
commentsChecker=false;
  addComments(value:any){
    
    if(value.value.length>250){
this.commentsCheckerLabel="letter must be <250";
this.commentsChecker=true;
    }
    else if (value.value.trim().length === 0) {
      this.commentsCheckerLabel = "Comment cannot be empty";
      this.commentsChecker=true;
    }
    else{
      this.commentsChecker=false;
      this.commentsCheckerLabel = "";

      if (this.usersDatalocal && this.usersDatalocal.length > 0) {
        var userid = JSON.parse(this.usersDatalocal!).id;
        var token = JSON.parse(this.usersDatalocal!).usertoken;
        const request={
          "courseId":this.idOfCourse,
          "lessonsNumber":this.idOfLessons,
          "id":userid,
          "token":token,
          "comments":value.value
        }
    const url = `https://corzacademy.runasp.net/api/lessons/Add comments`;
    this.http.post(url, request).subscribe((response) => {
this.comments.unshift(response);
value.value = "";
    })
  }
}
}
delteComment(value:number,index:number,commentType:number,subCommentIndex:number){
  Swal.fire({
    title: 'Do you want to delete this comment?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
  if (this.usersDatalocal && this.usersDatalocal.length > 0) {
    var userid = JSON.parse(this.usersDatalocal!).id;
    var token = JSON.parse(this.usersDatalocal!).usertoken;
    if(commentType==1){
      this.comments.splice(index, 1);}
      else{
       this.comments[index].comment.subComments.splice(subCommentIndex,1);
      }
      const request={
        "courseId":this.idOfCourse,
        "lessonsNumber":this.idOfLessons,
        "id":userid,
        "token":token,
        "commentId":value,
        "commentType":commentType
      }
const url = `https://corzacademy.runasp.net/api/lessons/delete comment`;
this.http.post(url, request).subscribe((response) => {

  
})
}}
else if (result.isDenied) {
  Swal.fire('deleted not saved', '', 'info')
}
})
}
subCommentsCheckerLabel="";
subCommentsChecker=false;
addSubComment(value:any,commentsId:number,index:number){
  if(value.value.length>250){
    this.subCommentsCheckerLabel="letter must be <250";
    this.subCommentsChecker=true;
        }
        else if (value.value.trim().length === 0) {
          this.subCommentsCheckerLabel = "Comment cannot be empty";
          this.subCommentsChecker=true;
        }
        else{
          this.subCommentsCheckerLabel = "";
          this.subCommentsChecker=false;
          if (this.usersDatalocal && this.usersDatalocal.length > 0) {
            var userid = JSON.parse(this.usersDatalocal!).id;
            var token = JSON.parse(this.usersDatalocal!).usertoken;
            const request={
              "courseId":this.idOfCourse,
              "lessonsNumber":this.idOfLessons,
              "id":userid,
              "token":token,
              "commentId":commentsId,
              "comments":value.value
            }
            const url = `https://corzacademy.runasp.net/api/lessons/add Sub comment`;
            this.http.post(url, request).subscribe((response) => {
              console.log(response);
              console.log(this.comments[index].comment.subComments);
              this.comments[index].comment.subComments.push(response);
              value.value = "";
            
            })
          }
        }
}
addLikeReaction(commentId:number,reaction:boolean,commentType:number,index:number,indexSubComment:number){
  if (this.usersDatalocal && this.usersDatalocal.length > 0) {
    var userid = JSON.parse(this.usersDatalocal!).id;
    var token = JSON.parse(this.usersDatalocal!).usertoken;
 var newReation={
    "courseId": this.idOfCourse,
    "lessonsNumber": this.idOfLessons,
    "id": userid,
    "token": token,
    "commentId": commentId,
    "userReaction": reaction,
    "commentsType": commentType
  }
  if(commentType==1){
  this.comments[index].comment.isLiked = reaction;
    this.comments[index].comment.Like =  this.comments[index].comment.like++;
 }
  else{
    console.log(commentId)
    this.comments[index].comment.subComments[indexSubComment].isLiked = reaction;
    this.comments[index].comment.subComments[indexSubComment].Like=this.comments[index].comment.subComments[indexSubComment].like++;

  }
  const url = `https://corzacademy.runasp.net/api/lessons/add reaction`;
this.http.post(url, newReation).subscribe((response) => {

})
}
}
addDisLikeReaction(commentId:number,reaction:boolean,commentType:number,index:number,indexSubComment:number){
  if (this.usersDatalocal && this.usersDatalocal.length > 0) {
    var userid = JSON.parse(this.usersDatalocal!).id;
    var token = JSON.parse(this.usersDatalocal!).usertoken;
 var newReation={
    "courseId": this.idOfCourse,
    "lessonsNumber": this.idOfLessons,
    "id": userid,
    "token": token,
    "commentId": commentId,
    "userReaction": reaction,
    "commentsType": commentType
  }
  if(commentType==1){
  this.comments[index].comment.isDisliked = true;
    this.comments[index].comment.disLike =  this.comments[index].comment.dislike++;
 }
  else{
    console.log(commentId)
    this.comments[index].comment.subComments[indexSubComment].isDisliked = true;
    this.comments[index].comment.subComments[indexSubComment].disLike=this.comments[index].comment.subComments[indexSubComment].dislike++;

  }
  const url = `https://corzacademy.runasp.net/api/lessons/add reaction`;
this.http.post(url, newReation).subscribe((response) => {

})
}
}
deleteLikeReaction(commentId:number,commentType:number,index:number,indexSubComment:number){
  if (this.usersDatalocal && this.usersDatalocal.length > 0) {
    var userid = JSON.parse(this.usersDatalocal!).id;
    var token = JSON.parse(this.usersDatalocal!).usertoken;
    if(commentType==1){
      this.comments[index].comment.isLiked = false;
        this.comments[index].comment.Like =  this.comments[index].comment.like--;
     }
      else{
        console.log(commentId)
        this.comments[index].comment.subComments[indexSubComment].isLiked = false;
        this.comments[index].comment.subComments[indexSubComment].Like=this.comments[index].comment.subComments[indexSubComment].like--;
    
      }
      const request={
        "id":userid,
        "token":token,
        "commentId":commentId,
        "commentType":commentType
      }
  const url = `https://corzacademy.runasp.net/api/lessons/delete reaction`;
this.http.post(url, request).subscribe((response) => {

})
}
}
deleteDisLikeReaction(commentId:number,commentType:number,index:number,indexSubComment:number){
  if (this.usersDatalocal && this.usersDatalocal.length > 0) {
    var userid = JSON.parse(this.usersDatalocal!).id;
    var token = JSON.parse(this.usersDatalocal!).usertoken;
    if(commentType==1){
      this.comments[index].comment.isDisliked = false;
        this.comments[index].comment.disLike =  this.comments[index].comment.dislike--;
     }
      else{
        console.log(commentId)
        this.comments[index].comment.subComments[indexSubComment].isDisliked = false;
        this.comments[index].comment.subComments[indexSubComment].disLike=this.comments[index].comment.subComments[indexSubComment].dislike--;
    
      }
      const request={
        "id":userid,
        "token":token,
        "commentId":commentId,
        "commentType":commentType
      }
  const url = `https://corzacademy.runasp.net/api/lessons/delete reaction`;
this.http.post(url, request).subscribe((response) => {

})
}
}
}