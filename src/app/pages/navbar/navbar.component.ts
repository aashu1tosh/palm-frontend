import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private toastr: ToastrService) { }

  logout() {
    sessionStorage.removeItem("accessToken");
    this.toastr.success('Logout Successful!', 'Success');
    this.router.navigateByUrl('/');
  }
}
