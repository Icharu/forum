import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

export type TopbarTab = 'home' | 'curso' | 'simulador' | 'faq' | '';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class TopbarComponent {
  @Input() sidebarOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  /** Which tab should appear active. Leave empty for none. */
  @Input() activeTab: TopbarTab = '';

  constructor(private router: Router) {}

  onToggle() { this.toggleSidebar.emit(); }

  VoltarForum()     { this.router.navigate(['/']); }
  IrParaVida()      { this.router.navigate(['/vida']); }
  IrParaSimulador() { this.router.navigate(['/simulador']); }
}
