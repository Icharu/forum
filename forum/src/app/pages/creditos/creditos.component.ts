import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-creditos',
    templateUrl: './creditos.component.html',
    styleUrls: ['./creditos.component.css'],
    standalone: true,
    imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, CommonModule]
})
export class CreditosComponent implements OnInit {
    frases: SafeHtml[] = [];
    showButton = false;
    rawFrases: string[] = [
        '<strong>Criador do Site</strong>'
        ];
    constructor(private router: Router, private sanitizer: DomSanitizer) { }
    opened: boolean = true;
        textoDigitado: SafeHtml = '';
    indiceFrase = 0;
    indiceLetra = 0;
    ngOnInit() {
        this.digitarFrase();
        setTimeout(() => {
            this.showButton = true;
            setTimeout(() => {
                this.showButton = false;
            }, 6000);
        }, 6000);
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
      abrirSite(url: string): void {
  window.open(url, "_blank");
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
        IrParaTurmas() {
        this.router.navigate(['/turmas']);
    }
    IrParaVida() {
        this.router.navigate(['/vida']);
    }
}