import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class EmployersListComponent implements OnInit {

  addEmployerForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    userName: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required)
  })
  employersList: any = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.setEmployers();
  }

  setEmployers() {
    this.apiService.getEmpoyersCreatedByMe().subscribe(createdEmployes => {
      console.log('Created employers', createdEmployes);
      this.employersList = createdEmployes;
    })
  }

  deleteUser(userId) {
    this.apiService.deleteUser(userId).subscribe(deletedUser => {
      ($ as any).notify({
        message: 'Deleted Employer'
      }, {
          type: 'sucess'
      })
        this.setEmployers();
    }, error => {
      ($ as any).notify({
        message: 'Unable to delete employer'
      }, {
          type: 'warning'
      })
    })
  }

  addEmployers() {
    if (this.addEmployerForm.valid) {
      this.apiService.addNewEmployer(this.addEmployerForm.value).subscribe(addedEmployer => {
        ($ as any).notify({
          message: 'Added Employer'
        }, {
            type: 'sucess'
        })
        this.setEmployers();
      }, error => {
        ($ as any).notify({
            message: 'Unable to create employer'
        }, {
            type: 'warning'
        })
      })
    }
  }



}
