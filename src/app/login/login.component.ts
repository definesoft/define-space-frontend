import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        userName: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
    })

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit(): void { }

    doLogin() {
        this.apiService.doLogin(this.loginForm.value).subscribe((afterLogin: any) => {
            this.router.navigate(['dashboard']);
            localStorage.setItem('token', afterLogin.token);
        }, error => {
            ($ as any).notify({
                message: 'Invalid Login'
            }, {
                type: 'warning'
            })
        })
    }
}
