import { Component, OnInit, HostListener} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { TopbarComponent } from '../../components/topbar/topbar';
import { FloatingCardComponent } from '../../components/floating-card/floating-card';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css'],
  standalone: true,
  imports: [MatIconModule, CommonModule, SidebarComponent, TopbarComponent, FloatingCardComponent]
})
export class TurmasComponent implements OnInit {

  sidebarOpen = true;
  showButton = false;
  isAdmin = false;
  isMobile = false;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.isAdmin = this.userService.getIsAdmin();
    this.checkMobile();
    setTimeout(() => {
      this.showButton = true;
      setTimeout(() => { this.showButton = false; }, 6000);
    }, 6000);
  }
  @HostListener('window:resize')
checkMobile() {
  const wasMobile = this.isMobile;
  this.isMobile = window.innerWidth <= 768;
  if (!wasMobile && this.isMobile) { this.sidebarOpen = false; }
  else if (wasMobile && !this.isMobile) { this.sidebarOpen = true; }
}

closeSidebarOnMobile() {
  if (this.isMobile) { this.sidebarOpen = false; }
}
  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }

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