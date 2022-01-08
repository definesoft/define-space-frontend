import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    endPoints = {
        login: environment.apiUrl + 'login',
        dashboardDetails: environment.apiUrl + 'dashboard-details',
        addEmployee: environment.apiUrl + 'users',
        userDetails: environment.apiUrl + 'users/details',
        addProject: environment.apiUrl + 'projects',
        getProjects: environment.apiUrl + 'projects',
        deleteUser: environment.apiUrl + 'users/delete-user/',
        updateUser: environment.apiUrl + 'users/update-user',
        deleteProject: environment.apiUrl + 'delete-project/',
        updateProject: environment.apiUrl + 'projects',
        uploadFileToS3: environment.apiUrl + 'uploadFile',
        getEmployesCreatedsByMe: environment.apiUrl + 'users/created-by-me',
        addSubmission: environment.apiUrl + 'users/submit-assignment',
        submissions: environment.apiUrl + 'users/submissions',
        generateFileLink: environment.apiUrl + 'users/generate-download-link',
        checkIsAdmin: environment.apiUrl + 'users/check-is-admin'
    }
    constructor(private http: HttpClient) {}

    doLogin({ userName, password }) {
        return this.http.post(this.endPoints.login, { userName, password })
    }
    getEmpoyersCreatedByMe() {
        return this.http.get(this.endPoints.getEmployesCreatedsByMe)
    }
    addNewEmployer(employerInput: any) {
        return this.http.post(this.endPoints.addEmployee, employerInput);
    }
    getProjects() {
        return this.http.get(this.endPoints.getProjects)
    }
    addNewProject(projectInput: any) {
        return this.http.post(this.endPoints.addProject, projectInput);
    }
    deleteProject(projectId: any) {
        return this.http.delete(this.endPoints.deleteProject + projectId);
    }
    deleteUser(userId: any) {
        return this.http.delete(this.endPoints.deleteUser + userId);
    }
    updateUserDetails(userInput: any) {
        return this.http.put(this.endPoints.updateUser, userInput);
    }
    getEmployerLoginDetails() {
        return this.http.get(this.endPoints.userDetails);
    }

    getDashboardDetails() {
        return this.http.get(this.endPoints.dashboardDetails);
    }

    uploadFileDetails(file: any) {
        const formData = new FormData();
        formData.append('file', file)
        return this.http.post(this.endPoints.uploadFileToS3, formData);
    }

    addSubmission(submissionDetails: any) {
        submissionDetails.submitedAt = new Date().toUTCString();
        return this.http.post(this.endPoints.addSubmission, submissionDetails);
    }

    getSubmissions() {
        return this.http.get(this.endPoints.submissions);
    }

    getDownloadLink(key: any) {
        return this.http.post(this.endPoints.generateFileLink, {
            key
        });
    }

    checkIsAdmin() {
        return this.http.get(this.endPoints.checkIsAdmin);
    }

    updateProject(project: any) {
        return this.http.put(this.endPoints.updateProject, project);
    }
}