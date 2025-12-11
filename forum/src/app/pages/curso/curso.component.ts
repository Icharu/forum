import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PdfDownloadService } from '../../services/pdfdownload.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
@Component({
    selector: 'app-curso',
    templateUrl: './curso.component.html',
    styleUrls: ['./curso.component.css'],
    standalone: true,
    imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, CommonModule]
})
export class CursoComponent implements OnInit {
    frases: SafeHtml[] = [];
    showButton = false;
    rawFrases: string[] = [
        '<strong>Estrutura Curricular</strong>'
        ];
    constructor(private router: Router, private sanitizer: DomSanitizer, private http: HttpClient, private pdfService: PdfDownloadService, private userService: UserService) { }
    textoDigitado: SafeHtml = '';
    indiceFrase = 0;
    indiceLetra = 0;
    username1: string = 'Não logado';
  isLogged: boolean = false;
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
    IrParaEngComp() {
        this.router.navigate(['/engcomp']);
    }
    IrParaFaqs() {
        this.router.navigate(['/faqs']);
    }
    download1() {
  this.pdfService.download('cursos/1.pdf', '1.pdf');
}
    download2() {
  this.pdfService.download('cursos/2.pdf', '2.pdf');
}
    download3() {
  this.pdfService.download('cursos/3.pdf', '3.pdf');
}
    download4() {
  this.pdfService.download('cursos/4.pdf', '4.pdf');
}
    download5() {
  this.pdfService.download('cursos/5.pdf', '5.pdf');
}
    download6() {
  this.pdfService.download('cursos/6.pdf', '6.pdf');
}
    download7() {
  this.pdfService.download('cursos/7.pdf', '7.pdf');
}
    download8() {
  this.pdfService.download('cursos/8.pdf', '8.pdf');
}
    download9() {
  this.pdfService.download('cursos/9.pdf', '9.pdf');
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
      IrParaTurmas() {
        this.router.navigate(['/turmas']);
    }
    IrParaVida() {
        this.router.navigate(['/vida']);
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
}