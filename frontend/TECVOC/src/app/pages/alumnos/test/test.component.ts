import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  userName: string | null = '';

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    if (!this.usersService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.userName = this.usersService.getUserName();
    }
  }
}
