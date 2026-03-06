import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css'],
  standalone: true,
  imports: [MatIconModule, CommonModule]
})
export class TurmasComponent implements OnInit {

  sidebarOpen = true;
  showButton = false;
  isAdmin = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.isAdmin = this.userService.getIsAdmin();

    setTimeout(() => {
      this.showButton = true;
      setTimeout(() => { this.showButton = false; }, 6000);
    }, 6000);
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