import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import axios from '../../services/instance';
import { loginValidationSchema } from './login-validation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginObj: Login = new Login();
  isLoading: boolean = false;

  constructor(private router: Router, private toastr: ToastrService) { }

  async onLogin() {
    try {
      // Validate the loginObj using Yup schema
      await loginValidationSchema.validate(this.loginObj);

      this.isLoading = true;
      try {
        const response = await axios.post(`/auth/login`, this.loginObj);
        this.isLoading = false;
        const res = response.data;
        console.log(res)
        if (res.success) {
          if (res.data.role == "ADMIN") {
            this.toastr.success('Login successful!', 'Success');
            sessionStorage.setItem('accessToken', res.data.token.accessToken);
            this.router.navigateByUrl('/dashboard');
          } else {
            this.router.navigateByUrl('/user');
          }
        } else {
          this.toastr.error(res.message || "Login Failed", 'Error');
        }
      } catch (error: any) {
        this.isLoading = false;
        console.error(error);
        this.toastr.error("Login Failed: " + (error.response?.data?.message || error.message), 'Error');
      }
    } catch (error: any) {
      this.toastr.error(error?.message);
    }
  }

  onRegisterClick() {
    // console.log("register clicked")
    this.router.navigateByUrl('/register');
  }
}

export class Login {
  email: string = '';
  password: string = '';
}
