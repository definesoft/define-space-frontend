import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetailsForm = new FormGroup({
    company: new FormControl('Define Space'),
    userName: new FormControl(null),
    email: new FormControl(null),
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    info: new FormControl(null)
  })

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.apiService.getEmployerLoginDetails().subscribe(employerDetails => {
      this.userDetailsForm.patchValue(employerDetails);
      this.userDetailsForm.controls.company.disable();
      this.userDetailsForm.controls.userName.disable();
      this.userDetailsForm.controls.email.disable();
    })
  }

  updateUserDetails() {
    this.apiService.updateUserDetails(this.userDetailsForm.value).subscribe(employerDetails => {
      ($ as any).notify({
        message: 'Details Updated'
      }, {
          type: 'sucess'
      })
    }, error => {
      ($ as any).notify({
        message: 'Unable to update'
      }, {
          type: 'warning'
      })
    })
  }

}
