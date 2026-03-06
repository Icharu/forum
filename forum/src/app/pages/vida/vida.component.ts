import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PdfDownloadService } from '../../services/pdfdownload.service';

@Component({
  selector: 'app-vida',
  templateUrl: './vida.component.html',
  styleUrls: ['./vida.component.css'],
  standalone: true,
  imports: [MatIconModule, CommonModule]
})
export class VidaComponent implements OnInit {

  sidebarOpen = true;
  showButton = false;
  isAdmin = false;

  rawFrases: string[] = ['<strong>Vida no Curso</strong>'];
  textoDigitado: SafeHtml = '';
  indiceFrase = 0;
  indiceLetra = 0;
  isMobile = false;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private pdfDownloadService: PdfDownloadService
  ) {}

  ngOnInit() {
    this.digitarFrase();
    this.isAdmin = this.userService.getIsAdmin();
    this.checkMobile();
    setTimeout(() => {
      this.showButton = true;
      setTimeout(() => { this.showButton = false; }, 6000);
    }, 6000);
  }

  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }

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

  download() {
    this.pdfDownloadService.download('cursos/10.pdf', '10.pdf');
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