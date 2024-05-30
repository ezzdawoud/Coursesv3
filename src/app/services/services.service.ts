import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient,private router:Router) { }

  singInMethod(email: string, password: string): Observable<any> {
    return this.http.post("https://corzacademy.runasp.net/api/Users/singin", { email, password });
  }

  logout(token: string): Observable<any> {
    const url = `https://corzacademy.runasp.net/api/Users/logout?token=${token}`;
    
    return this.http.post(url, {});
  }

  getUserRole(id: string, token: string): Observable<any> {
    const data={
      "id":id,
      "token":token
    }
    const url = `https://corzacademy.runasp.net/api/Users/getUserRole`;
    
    return this.http.post(url, data);
  }
getUserInformation(id:string,token:string){
  const data={
    "id":id,
    "token":token
  }
  const url = `https://corzacademy.runasp.net/api/Users/getUserData`;
  return this.http.post(url,data);
}
getTeacherData(id:string,token:string){
  const request={
    "id":id,
    "token":token
  }
  const url = `https://corzacademy.runasp.net/api/teacher/get Teacher Data`;
  return this.http.post(url, request);

}

getTeacherCourses(id:string,token:string){
  const request={
    "id":id,
    "token":token
  }
  const url = `https://corzacademy.runasp.net/api/courses/get teacher courses`;
  return this.http.post(url, request);

}

getCourses(filter:any){
  const url = `https://corzacademy.runasp.net/api/courses/get courses`;
  return this.http.post(url, filter);
}
getcourseDeitle(courseId:number){
  const url = `https://corzacademy.runasp.net/api/courses/get course/${courseId}`;
  return this.http.post(url, {});
}
confiermEmail(id:string,token:string){
  const request={
    "userId":id,
    "token":token
  }
   const url = `https://corzacademy.runasp.net/api/Users/confirmemail`;
  return this.http.post(url,request);
}

register(user:any){
  const url = `https://corzacademy.runasp.net/api/Users/register`;
  return this.http.post(url,{user});
}

insertCourse(course:any){
  const url = `https://corzacademy.runasp.net/api/courses/insert Course`;
  return this.http.post(url,course);
}
updatecouese(course:any){
  const url = `https://corzacademy.runasp.net/api/courses/update course`;
  return this.http.post(url,course);
}
uploadcourseImage(id:string,token:string,courseId:number,file:any){
  const formData: FormData = new FormData();
  formData.append('file', file);

  const url = `https://corzacademy.runasp.net/api/courses/upload course Image/${courseId}/${id}/${token}`;
  return this.http.post(url,file);
}
checkCourse(id:string,token:string,courseId:number){
  const request={
    "token":token,
    "userId":id,
    "courseId":courseId
  }
  const url = `https://corzacademy.runasp.net/api/courses/check course`;
  return this.http.post(url,request);
}
requestEmailChange(oldEmail: string) {
  const url = `https://corzacademy.runasp.net/api/Users/RequestEmailChange/${oldEmail}`;
  return this.http.post(url,{});
}
requestPasswordChange(email:string){
  var reset={
    "email": email
  }
  const url = `https://corzacademy.runasp.net/api/Users/request-password-change`;
  return this.http.post(url,reset);
}
changeEmail(token: string, newEmail: string) {
  const url = `https://corzacademy.runasp.net/api/Users/change-email`;
  return this.http.post(url, { token, newEmail });
}

confirmNewEmail(userId: string, token: string, newEmail: string) {
  const url = `https://corzacademy.runasp.net/api/Users/confirm-new-email/${userId}/${token}/${newEmail}`;
  return this.http.post(url, {});
}
  private handleError(error: HttpErrorResponse): Observable<never> {
    localStorage.removeItem("user")
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
