import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-submissions-list',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsListComponent implements OnInit {

  fileDetails;
  submissionForm = new FormGroup({
    submissionComments: new FormControl(null, Validators.required),
    fileDetails: new FormControl(null),
    toProject: new FormControl(null, Validators.required)
  })
  projects: any = [];
  submissions: any = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getProjects();
    this.getSubmissions();
  }

  getProjects() {
    this.apiService.getProjects().subscribe(addedProjects => {
      this.projects = addedProjects;
    })
  }

  getSubmissions() {
    this.apiService.getSubmissions().subscribe(addedProjects => {
      this.submissions = addedProjects;
    })
  }

  onAddFile(event: any) {
      console.log('event.target.files[0]', event.target.files[0]);
      
    if (event && event.target && event.target.files && event.target.files[0]) {
        this.fileDetails = event.target.files[0];
    }
  }

  addSubmission() {
    this.apiService.addSubmission(this.submissionForm.value).subscribe(projectJustAdded => {
        ($ as any).notify({
          message: 'Added New Project'
        }, {
            type: 'sucess'
        })
        this.getSubmissions();
      }, error => {
        ($ as any).notify({
            message: 'Unable to add project'
        }, {
            type: 'warning'
        })
      })
  }

  generateLink(fileDetails: any) {
    this.apiService.getDownloadLink(fileDetails).subscribe((downloadLink: any) => {
        window.open(downloadLink.link, '_blank')
    })
  }

  addFileAndSubmission() {
    if (this.submissionForm.valid) {
      if (this.fileDetails) {
        this.apiService.uploadFileDetails(this.fileDetails).subscribe((afterUpload: any) => {
            this.submissionForm.patchValue({
                fileDetails: afterUpload.key
            });
            this.addSubmission();
        });
      } else {
          this.addSubmission();
      }
    }
  }



}
