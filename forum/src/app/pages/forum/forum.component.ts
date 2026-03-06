import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.css'],
    standalone: true,
    imports: [MatIconModule, CommonModule]
})
export class ForumComponent implements OnInit {

  showButton = false;
  sidebarOpen = true;
  isMobile = false;
  rawFrases: string[] = ['<strong>Bem vindo ao Fórum</strong>'];
  newsList: News[] = [];
  isAdmin: boolean = false;

  textoDigitado: SafeHtml = '';
  indiceFrase = 0;
  indiceLetra = 0;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.checkMobile();
    this.digitarFrase();

    setTimeout(() => {
      this.showButton = true;
      setTimeout(() => { this.showButton = false; }, 6000);
    }, 6000);

    this.isAdmin = this.userService.getIsAdmin();
    this.carregarNoticias();
  }

  @HostListener('window:resize')
  checkMobile() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;

    // Only auto-adjust sidebarOpen on breakpoint crossings
    if (!wasMobile && this.isMobile) {
      this.sidebarOpen = false; // just became mobile → close
    } else if (wasMobile && !this.isMobile) {
      this.sidebarOpen = true;  // just became desktop → open
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebarOnMobile() {
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
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

  carregarNoticias(): void {
    this.newsService.listarTodas().subscribe({
      next: (data) => { this.newsList = data; },
      error: (err) => console.error('Erro ao carregar notícias', err)
    });
  }

  abrirSite(url: string): void { window.open(url, '_blank'); }

  VoltarForum()     { this.router.navigate(['/']); }
  IrParaVida()      { this.router.navigate(['/vida']); }
  IrParaCurso()     { this.router.navigate(['/curso']); }
  IrParaTurmas()    { this.router.navigate(['/turmas']); }
  IrParaFaqs()      { this.router.navigate(['/faqs']); }
  IrParaSimulador() { this.router.navigate(['/simulador']); }
  IrParaCreditos()  { this.router.navigate(['/creditos']); }
  IrParaAdmin()     { this.router.navigate(['/admin']); }
}