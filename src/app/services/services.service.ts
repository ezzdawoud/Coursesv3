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
    return this.http.post("https://localhost:7225/api/Users/singin", { email, password });
  }

  logout(token: string): Observable<any> {
    const url = `https://localhost:7225/api/Users/logout?token=${token}`;
    
    return this.http.post(url, {});
  }

  getUserRole(id: string, token: string): Observable<any> {
      
    const url = `https://localhost:7225/api/Users/getUserRole/${id}/${token}`;
    
    return this.http.post(url, {});
  }
getUserInformation(id:string,token:string){
  const url = `https://localhost:7225/api/Users/getUserData/${id}/${token}`;
  return this.http.post(url, {});
}
getTeacherData(id:string,token:string){
  const url = `https://localhost:7225/api/teacher/get Teacher Data/${id}/${token}`;
  return this.http.post(url, {});

}

getTeacherCourses(id:string,token:string){
  const url = `https://localhost:7225/api/courses/get teacher courses/${token}/${id}`;
  return this.http.post(url, {});

}

getCourses(filter:any){
  const url = `https://localhost:7225/api/courses/get courses`;
  return this.http.post(url, filter);
}
getcourseDeitle(courseId:number){
  const url = `https://localhost:7225/api/courses/get course/${courseId}`;
  return this.http.post(url, {});
}
confiermEmail(id:string,token:string){
   const url = `https://localhost:7225/api/Users/confirmemail/${id}/${token}`;
  return this.http.post(url,{});
}

register(user:any){
  const url = `https://localhost:7225/api/Users/register`;
  return this.http.post(url,{user});
}

insertCourse(id:string,token:string,course:any){
  const url = `https://localhost:7225/api/courses/insert Course/${id}/${token}`;
  return this.http.post(url,course);
}
updatecouese(id:string,token:string,courseId:number,course:any){
  const url = `https://localhost:7225/api/courses/update course/${token}/${id}/${courseId}`;
  return this.http.post(url,course);
}
uploadcourseImage(id:string,token:string,courseId:number,file:any){
  const formData: FormData = new FormData();
  formData.append('file', file);

  const url = `https://localhost:7225/api/courses/upload course Image/${courseId}/${id}/${token}`;
  return this.http.post(url,file);
}
checkCourse(id:string,token:string,courseId:number){
  const url = `https://localhost:7225/api/courses/check course/${token}/${id}/${courseId}`;
  return this.http.post(url,{});
}
requestEmailChange(oldEmail: string) {
  const url = `https://localhost:7225/api/Users/RequestEmailChange/${oldEmail}`;
  return this.http.post(url,{});
}
requestPasswordChange(email:string){
  var reset={
    "email": email
  }
  const url = `https://localhost:7225/api/Users/request-password-change`;
  return this.http.post(url,reset);
}
changeEmail(token: string, newEmail: string) {
  const url = `https://localhost:7225/api/Users/change-email`;
  return this.http.post(url, { token, newEmail });
}

confirmNewEmail(userId: string, token: string, newEmail: string) {
  const url = `https://localhost:7225/api/Users/confirm-new-email/${userId}/${token}/${newEmail}`;
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
