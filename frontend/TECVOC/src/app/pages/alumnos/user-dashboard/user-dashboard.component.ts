import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  userName: string = '';
  isCollapsed: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
   
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
