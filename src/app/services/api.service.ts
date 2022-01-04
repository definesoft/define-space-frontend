import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    endPoints = {
        login: environment.apiUrl + 'login'
    }
    constructor(private http: HttpClient) {}

    doLogin({ userName, password }) {
        return this.http.post(this.endPoints.login, { userName, password })
    }

}