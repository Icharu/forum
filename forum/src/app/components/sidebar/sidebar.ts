import { Component, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class SidebarComponent implements OnInit {
  @Input() sidebarOpen = true;
  @Output() sidebarOpenChange = new EventEmitter<boolean>();
  
  // Accept current route so we can highlight active items
  @Input() currentRoute = '';

  isMobile = false;
  isAdmin = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.checkMobile();
    this.isAdmin = this.userService.getIsAdmin();
  }

  @HostListener('window:resize')
  checkMobile() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    if (!wasMobile && this.isMobile)       { this.sidebarOpenChange.emit(false); }
    else if (wasMobile && !this.isMobile)  { this.sidebarOpenChange.emit(true); }
  }

  toggleSidebar() {
    this.sidebarOpenChange.emit(!this.sidebarOpen);
  }

  closeSidebarOnMobile() {
    if (this.isMobile) {
      this.sidebarOpenChange.emit(false);
    }
  }

  abrirSite(url: string) { window.open(url, '_blank'); }

  VoltarForum()     { this.router.navigate(['/']); }
  IrParaVida()      { this.router.navigate(['/vida']); }
  IrParaCurso()     { this.router.navigate(['/curso']); }
  IrParaTurmas()    { this.router.navigate(['/turmas']); }
  IrParaFaqs()      { this.router.navigate(['/faqs']); }
  IrParaSimulador() { this.router.navigate(['/simulador']); }
  IrParaCreditos()  { this.router.navigate(['/creditos']); }
  IrParaAdmin()     { this.router.navigate(['/admin']); }
}
