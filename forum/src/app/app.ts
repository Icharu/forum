import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('forum');
  constructor(private router: Router) {}

  ngOnInit(): void {

    if (this.isMobileDevice()) {
      alert('Este site não está disponível em dispositivos móveis.');
      window.location.href = 'http://icarodejesus.com/404';
    }
  }

  private isMobileDevice(): boolean {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
  }
}
