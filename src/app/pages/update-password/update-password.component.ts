import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as Yup from 'yup';
import axios from '../../services/instance';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UpdatePasswordComponent {
  password!: string;

  passwordSchema = Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one special character')
    .required('Password is required');


  constructor(
    private dialogRef: MatDialogRef<UpdatePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private toastr: ToastrService
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  async onUpdate(): Promise<void> {
    try {
      await this.passwordSchema.validate(this.password);
      const id = this.data.id
      const response = await axios.patch(`/admin/reset-password`, { id: id, newPassword: this.password });
      this.dialogRef.close(response.data);
      this.toastr.success('Login successful!', 'Success');
    } catch (error) {
      // this.toastr.error('Password Change Unsuccessful!', 'Error');
      if (error instanceof Yup.ValidationError) {
        this.toastr.error(error.message, 'Validation Error');
      } else {
        this.toastr.error('Password change unsuccessful!', 'Error');
      }
    }
  }
}
