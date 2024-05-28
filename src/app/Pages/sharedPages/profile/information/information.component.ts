import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnDestroy{
usersDatalocal: any = localStorage.getItem("user");
userData:any={}
updateDataForm:any;
imageUrl: string | undefined;
subscription:Subscription|undefined;
isLoading=true;

constructor(private services:ServicesService,private router:Router,private form:FormBuilder,private http:HttpClient){
  
  if (this.usersDatalocal && this.usersDatalocal.length > 0) {
    var userid = JSON.parse(this.usersDatalocal!).id;
    var token = JSON.parse(this.usersDatalocal!).usertoken;
    this.subscription = this.services.getUserInformation(userid,token).subscribe((response)=>{
  this.userData=response
  console.log(response)
  this.updateDataForm.patchValue({

    userName:this.userData.userName,
    Email:this.userData.userEmail,
    phone:this.userData.phoneNumber|| " ",
    
  })
  this.imageUrl=this.userData.usersPictrues;
  this.isLoading=false;

},(error)=>{
this.router.navigate(["/signin"])
})

  }


  this.updateDataForm=this.form.group({
    userName:[{value: '', disabled: true},[Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
    Email:[{value: '', disabled: true},[Validators.email,Validators.required,Validators.minLength(4),Validators.maxLength(50)]],
    phone:[{value: '', disabled: true},[Validators.required,Validators.maxLength(16),Validators.minLength(10)]],
    file:['',this.fileValidator]
  })
}
  ngOnDestroy(): void {
if(this.subscription){
  this.subscription.unsubscribe();
}
  }
fileValidator(control: any) {
  const file = control.value;
  if (file) {
    const maxSize = 3 * 1024 * 1024; // 3 MB in bytes
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Allowed image types
    if (file.size > maxSize) {
      return { 'maxSizeExceeded': true };
    }
    if (!allowedTypes.includes(file.type)) {
      return { 'invalidFileType': true };
    }
  }
  return null;
}

onFileSelected(event: any) {
  const file = event.target.files[0];
    const reader: FileReader = new FileReader();

    if (file) {
      const maxSize = 3 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only image files (JPEG, PNG, GIF) are allowed.');
        event.target.value = ''; 
        return;
      }
      if (file.size > maxSize) {
        alert('File size exceeds 3 MB limit.');
        event.target.value = ''; 
        return;
      }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
    }
}
isEditingVar=true;
isEditing(){
  console.log(this.isEditingVar)
  if(this.isEditingVar){
    console.log("osiadjoisaj")
  this.updateDataForm.get('userName').enable();
  this.updateDataForm.get('phone').enable();
  this.isEditingVar=false;
}
else{
  this.updateDataForm.get('userName').disable();
  this.updateDataForm.get('phone').disable();
   this.isEditingVar=true;
   console.log(this.isEditingVar)

}
}
validLableName=""
validLablePhoneNumber=""
validPhone=false;
validName=false;
updateUserData(){
  if((/\s/.test(this.updateDataForm.get("userName").value))){
    this.validLableName="must be without spacing"
    this.validName=true;
  }
  else if(this.updateDataForm.get("userName").hasError("required")){
this.validLableName="this filed is required"
this.validName=true;
}
else if(this.updateDataForm.get("userName").hasError("minlength")){
  this.validLableName="10-16"
  this.validName=true;

}
else if(this.updateDataForm.get("userName").hasError("maxlength")){
  this.validLableName="10-16"
  this.validName=true;

}
else{
  this.validLableName=""
  this.validName=false;
}
if(this.updateDataForm.get("phone").hasError("required")){
  this.validLablePhoneNumber="this filed is required"
  this.validPhone=true;
  }
  else if(this.updateDataForm.get("phone").hasError("minlength")){
    this.validLablePhoneNumber="10-16"
    this.validPhone=true;
  
  }
  else if(this.updateDataForm.get("phone").hasError("maxlength")){
    this.validLablePhoneNumber="10-16"
    this.validPhone=true;
  
  }
  else{
    this.validLablePhoneNumber=""
    this.validPhone=false;
  }
  if(!this.validName&&!this.validPhone){
  if (this.usersDatalocal && this.usersDatalocal.length > 0) {
    var userid = JSON.parse(this.usersDatalocal!).id;
    var token = JSON.parse(this.usersDatalocal!).usertoken;
    var name=this.updateDataForm.get('userName').value;
    var number=this.updateDataForm.get('phone').value;
    this.isLoading=true;
    const url = `http://corzacademy.runasp.net/api/Users/update user data/${userid}/${token}/${name}/${number}`;
    this.http.post(url, {}).subscribe((response:any) => {
      Swal.fire({
        title: "Success",
        text: response.message,
        icon: "success"
      });  
      this.updateDataForm.get('userName').disable();
      this.updateDataForm.get('phone').disable();
       this.isEditingVar=true;
       this.isLoading=false;
    },(error)=>{
      Swal.fire({
        title: "Error",
        text: error.error.message,
        icon: "error"
      });   
      this.isLoading=false;
  
    }
  
  )
    
  }
}

}}


