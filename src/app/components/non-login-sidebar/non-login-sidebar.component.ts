import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

@Component({
  selector: 'non-login-sidebar',
  templateUrl: './non-login-sidebar.component.html',
  styleUrls: ['./non-login-sidebar.component.scss']
})
export class NonLoginSidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
  };
  ngOnInit(): void {}
}
