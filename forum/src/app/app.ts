import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { IntroComponent } from './components/intro/intro';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IntroComponent],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('forum');
  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  private isMobileDevice(): boolean {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
  }
}
