import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { DataService } from './data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatPaginator, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'phone', 'role', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private dialog: MatDialog, private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.dataService.fetchData()
      .then(response => {
        this.dataSource.data = response.data.data.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  async onDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        try {
          await this.dataService.deleteUser(id);
          this.dataSource.data = this.dataSource.data.filter((item: any) => item._id !== id);
          this.toastr.success('Deletion successful!');
        } catch (error) {
          this.toastr.error('Deletion Failed!', 'Error');
        }
      }
    });
  }

  async onUpdatePassword(id: string) {
    const dialogRef = this.dialog.open(UpdatePasswordComponent, {
      width: '300px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
