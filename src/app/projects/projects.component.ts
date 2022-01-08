import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsListComponent implements OnInit {

  addProjectForm = new FormGroup({
    projectStatus: new FormControl('Not Started', Validators.required),
    projectType: new FormControl('Design', Validators.required),
    projectName: new FormControl(null, Validators.required)
  })
  status = [
    'Not Started',
    'In Progress',
    'Completed'
  ]
  type = ['On Site', 'Design']
  projects: any = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.apiService.getProjects().subscribe(addedProjects => {
      console.log('Created employers', addedProjects);
      this.projects = addedProjects;
    })
  }

  onValueChange(updated: any) {
    this.apiService.updateProject(updated).subscribe(value => {
      this.getProjects();
    })
  }

  deleteProject(projectId) {
    this.apiService.deleteProject(projectId).subscribe(deletedProject => {
      ($ as any).notify({
        message: 'Deleted Project'
      }, {
          type: 'sucess'
      })
        this.getProjects();
    }, error => {
      ($ as any).notify({
        message: 'Unable to delete project'
      }, {
          type: 'warning'
      })
    })
  }

  addProject() {
    if (this.addProjectForm.valid) {
      this.apiService.addNewProject(this.addProjectForm.value).subscribe(projectJustAdded => {
        ($ as any).notify({
          message: 'Added New Project'
        }, {
            type: 'sucess'
        })
        this.getProjects();
      }, error => {
        ($ as any).notify({
            message: 'Unable to add project'
        }, {
            type: 'warning'
        })
      })
    }
  }



}
