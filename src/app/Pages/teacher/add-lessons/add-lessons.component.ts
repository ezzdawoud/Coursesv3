import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-lessons',
  templateUrl: './add-lessons.component.html',
  styleUrls: ['./add-lessons.component.css']
})
export class AddLessonsComponent {
  idOfCourse: any;
  addform:any;
  usersDatalocal = localStorage.getItem("user");

  constructor(private route: ActivatedRoute, private http: HttpClient,private router:Router,private from:FormBuilder) {

    this.addform=this.from.group({
      lessonsName:['',[Validators.required,Validators.maxLength(16),Validators.minLength(4)]],
      lessonsDescription:['',[Validators.required,Validators.maxLength(100),Validators.minLength(16)]],
      file: [null, [this.fileValidator]] 

    })
    if (this.usersDatalocal && this.usersDatalocal.length > 0) {
      var userid = JSON.parse(this.usersDatalocal!).id;
      var token = JSON.parse(this.usersDatalocal!).usertoken;
      this.route.params.subscribe((parms) => { this.idOfCourse = parms 
const request={
"token":token,
"userId":userid,
"courseId":this.idOfCourse.courseId
}     
      const url = `https://corzacademy.runasp.net/api/courses/getCourseDataForTeacher`;
      this.http.post(url,request).subscribe((response)=>{

      },
      (error)=>{
        Swal.fire({
          title: "error",
          text:error,
          icon: "error"
        }).then(()=>{
          this.router.navigate(["/teacher"])
        });   
      }
    
    )})
    }
  }
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  selectedVideo: string | ArrayBuffer | null = null;
  loadingProgress: number | null = null;
  timeRemaining: number | null = null;
  timeRemainingFormatted: string = '';

  fileValidator(control: any) {
    const file = control.value;
    if (file) {
      const maxSize = 100 * 1024 * 1024; // 100 MB in bytes
      const allowedType = 'video/mp4'; // Only allow mp4 files
      if (file.size > maxSize) {
        return { 'maxSizeExceeded': true };
      }
      if (file.type !== allowedType) {
        return { 'invalidFileType': true };
      }
    }
    return null;
  }

  onFileSelected(event: any) {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.load();
    }
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();

    if (file) {
     
      const maxSize = 100 * 1024 * 1024;
      const allowedType = 'video/mp4';
      
      if (file.type !== allowedType) {
        alert('Only video files (MP4) are allowed.');
        event.target.value = '';
        return;
      }
      if (file.size > maxSize) {
        alert('File size exceeds 100 MB limit.');
        event.target.value = '';
        return;
      }
      
      reader.onprogress = (e: ProgressEvent<FileReader>) => {
        if (e.lengthComputable) {
          this.loadingProgress = (e.loaded / e.total) * 100;

          // Calculate time remaining based on current progress
          const bytesLoaded = e.loaded;
          const totalBytes = e.total;
          const remainingBytes = totalBytes - bytesLoaded;
          const currentSpeed = bytesLoaded / (e.timeStamp / 1000);
          this.timeRemaining = remainingBytes / currentSpeed;

          // Format the remaining time
          this.timeRemainingFormatted = this.formatTime(this.timeRemaining);
        }
      };
      
      reader.onload = (e: any) => {
        this.selectedVideo = e.target.result;
        this.loadingProgress = null;
        this.timeRemaining = null;

        // Reload the video element to reflect the changes
        this.videoPlayer.nativeElement.load();
      };

      reader.readAsDataURL(file);
    }
  }
 formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  

lessonsNameValidLabel=""
lessonsNameValid=false;
LessonsDescriptionValidLabel=""
LessonsDescriptionValid=false 
videoValidLabel=""
VidelValid=false;

  addlessonsMethod(){
    if (this.addform.get("lessonsName").hasError("required")) {
      this.lessonsNameValidLabel = "*This filed is required";
      this.lessonsNameValid = false
    }
    else if (this.addform.get("lessonsName").hasError("minlength")) {
      this.lessonsNameValidLabel = "*Name must be between 4-50";
      this.lessonsNameValid = false

    }
    else if (this.addform.get("couresNlessonsNameame").hasError("maxlength")) {
      this.lessonsNameValidLabel = "*Name must be between 4-50";
      this.lessonsNameValid = false
    }
    else {
      this.lessonsNameValidLabel = "";
      this.lessonsNameValid = true

    }
    if (this.addform.get("lessonsDescription").hasError("required")) {
      this.LessonsDescriptionValidLabel = "*This filed is required"
      this.LessonsDescriptionValid = false;
    }
    else if (this.addform.get("lessonsDescription").hasError("minlength")) {
      this.LessonsDescriptionValidLabel = "*coures Description must be between 16-100"
      this.LessonsDescriptionValid = false;
      
    }
    else if (this.addform.get("lessonsDescription").hasError("maxlength")) {
      this.LessonsDescriptionValidLabel = "*coures Description must be between 16-100"
      this.LessonsDescriptionValid = false;
    }
    else {
     this.LessonsDescriptionValidLabel = ""
      this.LessonsDescriptionValid = true;
    }
    if (!this.addform.get('file').value) {
      this.videoValidLabel="*upload video"
      this.VidelValid=false;
    
    }
    else{
      this.videoValidLabel=""
      this.VidelValid=true;
    }

  }
}
