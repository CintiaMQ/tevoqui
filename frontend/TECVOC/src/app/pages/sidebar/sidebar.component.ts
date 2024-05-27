import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  isSidebarVisible: boolean = true;
  isAuthenticated: boolean;
  userName: string | null = '';

  constructor(private usersService: UsersService) {
    this.isAuthenticated = this.usersService.isAuthenticated();
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
  }

  logout() {
    this.usersService.logout();
  }
}
