import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { PdfDownloadService } from '../../services/pdfdownload.service';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';
@Component({
    selector: 'app-calc',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    standalone: true,
    imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, FormsModule, CommonModule]
})
export class AdminComponent implements OnInit {
        frases: SafeHtml[] = [];
        showButton = false;
  rawFrases: string[] = [
    '<strong>Painel do Administrador</strong>'
  ];
    constructor(private router: Router, private sanitizer: DomSanitizer, private snackBar: MatSnackBar, private pdfDownloadService: PdfDownloadService, private http: HttpClient, private userService: UserService, private newsService: NewsService) { }
    textoDigitado: SafeHtml = '';
    indiceFrase = 0;
    imageUrl: string = '';
    title: string = '';
    descr: string = '';

    
    isAdmin: boolean = false;
    newsList: News[] = [];
    indiceLetra = 0;
    opened: boolean = true;
    username1: string = 'Não logado';
  isLogged: boolean = false;
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
    IrParaFaqs() {
        this.router.navigate(['/faqs']);
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
  download() {
  this.pdfDownloadService.download('cursos/10.pdf', '10.pdf');
}
    IrParaTurmas() {
        this.router.navigate(['/turmas']);
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
  salvarNews() {
  if (!this.imageUrl || !this.title || !this.descr) {
    this.snackBar.open('Preencha todos os campos', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    return;
  }

  const news: News = {
      title: this.title,
      descr: this.descr,
      imgurl: this.imageUrl,
      createdAt: ''
  };

  this.newsService.criar(news).subscribe({
    next: (res) => {
      this.newsList.push(res);
      this.snackBar.open('Sucesso!', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    },
    error: (err) => {
      console.error(err);
      this.snackBar.open('Formatação errada ou faltando informações', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
  });
}

}
