import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-card',
  templateUrl: './floating-card.html',
  styleUrls: ['./floating-card.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FloatingCardComponent {
  @Input() visible = false;
}
