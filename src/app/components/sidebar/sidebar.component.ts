import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/employers', title: 'Employers List',  icon:'content_paste', class: '' },
    { path: '/projects', title: 'Projects',  icon:'assured_workload', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.checkIsAdmin().subscribe(({isAdmin}: any) => {
      if (isAdmin) {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
      } else {
      this.menuItems = ROUTES.slice(0, 2);
      }
    })
  }
  
}
