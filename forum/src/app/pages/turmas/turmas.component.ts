import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { PdfDownloadService } from '../../services/pdfdownload.service';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
@Component({
    selector: 'app-turmas',
    templateUrl: './turmas.component.html',
    styleUrls: ['./turmas.component.css'],
    standalone: true,
    imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, CommonModule]
})
export class TurmasComponent implements OnInit {
          frases: SafeHtml[] = [];
          showButton = false;
  rawFrases: string[] = [
    '<strong>Turmas do Curso</strong>'
  ];
  username1: string = 'Não logado';
  isLogged: boolean = false;
    constructor(private router: Router, private sanitizer: DomSanitizer, private pdfDownloadService: PdfDownloadService, private http: HttpClient, private userService: UserService) { }
    textoDigitado: SafeHtml = '';
    indiceFrase = 0;
    indiceLetra = 0;
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
    IrParaTurmas() {
        this.router.navigate(['/turmas']);
    }
    IrParaVida() {
        this.router.navigate(['/vida']);
    }
      IrParaLogin() {
    this.router.navigate(['/login']);
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
abrirSite(url: string): void {
  window.open(url, "_blank");
}
  logout() {
    this.userService.logout();
    this.username1 = 'Não Logado';
    this.isLogged = false;
    window.location.reload();
  }
}
