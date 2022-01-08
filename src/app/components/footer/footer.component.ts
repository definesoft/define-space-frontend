import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() logOutButton = false;
  
  constructor() { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
