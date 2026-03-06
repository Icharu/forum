import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-creditos',
    templateUrl: './creditos.component.html',
    styleUrls: ['./creditos.component.css'],
    standalone: true,
    imports: [MatIconModule, CommonModule]
})
export class CreditosComponent implements OnInit {

  showButton = false;
  sidebarOpen = true;
  isAdmin: boolean = false;

  rawFrases: string[] = ['<strong>Criador do Site</strong>'];
  textoDigitado: SafeHtml = '';
  indiceFrase = 0;
  isMobile = false;
  indiceLetra = 0;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.digitarFrase();
    this.checkMobile();
    setTimeout(() => {
      this.showButton = true;
      setTimeout(() => {
        this.showButton = false;
      }, 6000);
    }, 6000);

    this.isAdmin = this.userService.getIsAdmin();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  digitarFrase() {
    const fraseAtual = this.rawFrases[this.indiceFrase];
    const parte = fraseAtual.substring(0, this.indiceLetra);
    this.textoDigitado = this.sanitizer.bypassSecurityTrustHtml(parte);

    if (this.indiceLetra < fraseAtual.length) {
      this.indiceLetra++;
      setTimeout(() => this.digitarFrase(), 30);
    } else {
      setTimeout(() => {
        if (this.indiceFrase < this.rawFrases.length - 1) {
          this.indiceFrase++;
          this.indiceLetra = 0;
          this.digitarFrase();
        }
      }, 1500);
    }
  }

  abrirSite(url: string): void {
    window.open(url, '_blank');
  }

  VoltarForum()     { this.router.navigate(['/']); }
  IrParaVida()      { this.router.navigate(['/vida']); }
  IrParaCurso()     { this.router.navigate(['/curso']); }
  IrParaTurmas()    { this.router.navigate(['/turmas']); }
  IrParaFaqs()      { this.router.navigate(['/faqs']); }
  IrParaSimulador() { this.router.navigate(['/simulador']); }
  IrParaCreditos()  { this.router.navigate(['/creditos']); }
  IrParaAdmin()     { this.router.navigate(['/admin']); }

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
}