import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {
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

