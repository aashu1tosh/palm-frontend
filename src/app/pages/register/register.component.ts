import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import axios from '../../services/instance';
import { RegisterValidationSchema } from './register-validation';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerObj: Register = new Register();
  isLoading: boolean = false;

  constructor(private router: Router, private toastr: ToastrService) { }

  async onRegistration() {
    try {
      await RegisterValidationSchema.validate(this.registerObj, { abortEarly: false });
      this.isLoading = true;
      try {
        const response = await axios.post(`/auth/register`, this.registerObj);
        this.isLoading = false;
        const res = response.data;
        console.log(res)
        if (res.success) {
          this.toastr.success('Registration successful!', 'Success');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(res.message || "Registration Failed", 'Error');
        }
      } catch (error: any) {
        this.isLoading = false;
        console.error(error);
        this.toastr.error("Registration Failed: " + (error.response?.data?.message || error.message), 'Error');
      }
    } catch (validationError: any) {
      const errors: { [key: string]: string } = {};

      validationError.inner.forEach((error: any) => {
        errors[error.path] = error.message;
        this.toastr.error(error?.message);
      });
      // Display a general error message using toastr


    }
  }

  onLoginClick() {
    this.router.navigateByUrl('/login');
  }
}

export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
}
