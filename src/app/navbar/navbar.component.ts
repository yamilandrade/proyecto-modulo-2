import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router) {}
  goToAbout() {
    this.router.navigate(['/about']);
  }
  goToHome() {
    this.router.navigate(['/']);
  }
  goToDetail() {
    this.router.navigate(['/detail']);
  }
}
