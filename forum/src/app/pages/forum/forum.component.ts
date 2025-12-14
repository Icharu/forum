import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
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
    imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, CommonModule]
})
export class ForumComponent implements OnInit {
          frases: SafeHtml[] = [];
          showButton = false;
  rawFrases: string[] = [
    '<strong>Bem vindo ao Fórum</strong>'
  ];
  username1: string = 'Não logado';
  newsList: News[] = [];
  isLogged: boolean = false;
   @ViewChild('carouselRef') carousel!: ElementRef;
    constructor(private router: Router, private sanitizer: DomSanitizer, private userService: UserService, private newsService: NewsService) { }
    textoDigitado: SafeHtml = '';
    indiceFrase = 0;
    indiceLetra = 0;
    isAdmin: boolean = false;
    opened: boolean = true;
    ngOnInit() {
    this.digitarFrase();
  setTimeout(() => {
  this.showButton = true;
  setTimeout(() => {
    this.showButton = false;
  }, 6000);

}, 6000);
  this.isLogged = this.userService.isLoggedIn();
      const name = this.userService.getUsername();
    if (name) {
      this.username1 = name;
    }

    this.isAdmin = this.userService.getIsAdmin();
    this.carregarNoticias();
  }

    VoltarHome() {
        this.router.navigate(['/']);
    }
    IrParaCurso() {
        this.router.navigate(['/curso']);
    }
    IrParaCreditos() {
        this.router.navigate(['/creditos']);
    }
    VoltarForum() {
        this.router.navigate(['/forum']);
    }
    IrParaTurmas() {
        this.router.navigate(['/turmas']);
    }
    IrParaVida() {
        this.router.navigate(['/vida']);
    }
        digitarFrase() {
    const fraseAtual = this.rawFrases[this.indiceFrase];

    const parte = fraseAtual.substring(0, this.indiceLetra);

    this.textoDigitado = this.sanitizer.bypassSecurityTrustHtml(parte);

    if (this.indiceLetra < fraseAtual.length) {
      this.indiceLetra++;
      setTimeout(() => this.digitarFrase(), 30);
    }
    else {
      setTimeout(() => {
        if (this.indiceFrase < this.rawFrases.length - 1) {
          this.indiceFrase++;
          this.indiceLetra = 0;
          this.digitarFrase();
        }
      }, 1500); 
    }
  }
  IrParaFaqs() {
        this.router.navigate(['/faqs']);
    }
      scrollCarousel(direction: number) {
    const container = this.carousel.nativeElement;
    const cardWidth = container.querySelector('.book-card').offsetWidth + 20;
    container.scrollLeft += direction * cardWidth;
  }
  abrirSite(url: string): void {
  window.open(url, "_blank");
}
  IrParaLogin() {
    this.router.navigate(['/login']);
  }
  logout() {
    this.userService.logout();
    this.username1 = 'Não Logado';
    this.isLogged = false;
    window.location.reload();
  }
  IrParaAdmin() {
    this.router.navigate(['/admin'])
  }
carregarNoticias(): void {
  this.newsService.listarTodas().subscribe({
    next: (data) => {
      this.newsList = data;
    },
    error: (err) => console.error('Erro ao carregar notícias', err)
  });
}


}
