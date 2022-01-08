import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardInfo: any = {};

  constructor(private apiService: ApiService) { }
  
  ngOnInit() {
    this.getDashBoardDetails();
  }

  getDashBoardDetails() {
    this.apiService.getDashboardDetails().subscribe(dashboardData => {
      this.dashboardInfo = dashboardData;
    })
  }

}
