import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.html',
  styleUrls: ['./intro.css'],
  standalone: true,
  imports: [CommonModule]
})
export class IntroComponent implements OnInit {
  visible = false;
  leaving = false;

  ngOnInit() {
    if (!sessionStorage.getItem('intro_shown')) {
      this.visible = true;
      sessionStorage.setItem('intro_shown', '1');
      setTimeout(() => {
        this.leaving = true;
        setTimeout(() => { this.visible = false; }, 700);
      }, 2000);
    }
  }
}
