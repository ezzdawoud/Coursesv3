import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPassword: any;
  constructor(private from: FormBuilder,private http:HttpClient) {
    this.forgotPassword = this.from.group({
      Email: ["", [Validators.email, Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    })
  }
  validLableEmail = ""
  forgotPasswordMethod() {
    let isValid = false;
    if (this.forgotPassword.get('Email').hasError('required')) {
      this.validLableEmail = "required"
      isValid = false;
    }
    else if (this.forgotPassword.get('Email').hasError('maxlength')) {
      this.validLableEmail = "maxlength"
      isValid = false;
    }
    else if (this.forgotPassword.get('Email').hasError('minlength')) {
      this.validLableEmail = "minlength"
      isValid = false;
    }
    else if (this.forgotPassword.get('Email').hasError('email')) {
      this.validLableEmail = "email"
      isValid = false;
    }
    else {
      this.validLableEmail = ""
      isValid = true;
    }

    if (this.forgotPassword.valid && isValid) {
      const request={
        "Email":this.forgotPassword.get('Email').value
      }
      const url = `https://corzacademy.runasp.net/api/Users/request-password-change`;
      this.http.post(url,request).subscribe((response:any) => {
        Swal.fire({
          title: "Success",
          text: response.message,
          icon: "success"
        });  
      })
    }
  }
}
