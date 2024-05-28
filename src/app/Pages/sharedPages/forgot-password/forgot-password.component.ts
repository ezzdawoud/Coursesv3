import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPassword: any;
  constructor(private from: FormBuilder) {
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
      console.log("done")
    }
  }
}
