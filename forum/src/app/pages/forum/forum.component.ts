import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { TopbarComponent } from '../../components/topbar/topbar';
import { FloatingCardComponent } from '../../components/floating-card/floating-card';

export interface News {
  title:  string;
  descr:  string;
  data:   string;
  imgurl: string;
  tag:    NewsTag | '';
  link?:  string;
}

export type NewsTag = 'noticia' | 'evento' | 'aviso' | 'urgente' | 'projeto';

const HARDCODED_NEWS: News[] = [

  {
    title:  'Semana de Acolhimento 2026.1',
    descr:  'O curso de Engenharia da Computação da UEMA dá as boas-vindas à turma 2026.1! ' +
            'A semana de acolhimento acontece nos dias 10-11 no prédio de CECEN. ' +
            'O evento inicia às 18h no dia 10 para alunos do período noturno no Centro de Educação, Ciências Exatas e Naturais (Cecen) e às 8h do dia 11 para alunos matutinos e vespertinos, na Quadra Poliesportiva, ambos no Campus Paulo VI. ',
    data:   '10-11 mar 2026',
    imgurl: '/img/uema-fachada.jpg',
    tag:    'evento',
    link:   'https://www.uema.br/2026/03/confira-a-programacao-do-acolhimento-academico-2026-1-em-sao-luis/'
  },

];

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  standalone: true,
  imports: [MatIconModule, CommonModule, SidebarComponent, TopbarComponent, FloatingCardComponent]
})
export class ForumComponent implements OnInit {

  showButton  = false;
  sidebarOpen = true;
  isMobile    = false;
  isAdmin     = false;

  rawFrases: string[] = ['<strong>Bem vindo ao Fórum</strong>'];
  newsList:  News[]   = [];

  textoDigitado: SafeHtml = '';
  indiceFrase  = 0;
  indiceLetra  = 0;

  readonly tagClass: Record<string, string> = {
    noticia:  'tag-noticia',
    evento:   'tag-evento',
    aviso:    'tag-aviso',
    urgente:  'tag-urgente',
    projeto:  'tag-projeto',
  };

  constructor(
    private router:      Router,
    private sanitizer:   DomSanitizer,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.checkMobile();
    this.digitarFrase();

    setTimeout(() => {
      this.showButton = true;
      setTimeout(() => { this.showButton = false; }, 6000);
    }, 6000);

    this.isAdmin = this.userService.getIsAdmin();
    this.newsList = HARDCODED_NEWS;
  }

  @HostListener('window:resize')
  checkMobile() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    if (!wasMobile && this.isMobile)       this.sidebarOpen = false;
    else if (wasMobile && !this.isMobile)  this.sidebarOpen = true;
  }

  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }

  closeSidebarOnMobile() { if (this.isMobile) this.sidebarOpen = false; }

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