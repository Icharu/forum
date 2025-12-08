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
@Component({
    selector: 'app-calc',
    templateUrl: './calc.component.html',
    styleUrls: ['./calc.component.css'],
    standalone: true,
    imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, FormsModule, CommonModule]
})
export class CalcComponent implements OnInit {
        frases: SafeHtml[] = [];
        resultado: string = "";
        nota1: number = 0;
        nota2: number = 0;
        nota3: number = 0;
        showButton = false;
  rawFrases: string[] = [
    '<strong>Calculadora de Notas!</strong>'
  ];
    constructor(private router: Router, private sanitizer: DomSanitizer, private pdfDownloadService: PdfDownloadService, private http: HttpClient) { }
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
    calcular() {
  const soma = this.nota1 + this.nota2 + this.nota3;
  const media = (this.nota1 + this.nota2 + this.nota3)/3;
  if (soma >= 21) {
    this.resultado = `Parabéns, passou! Uhul 🎉 Média ${media}`;
    return;
  }
  if (soma < 15) {
    this.resultado = `Reprovado | Média = ${media} Depois você consegue!`;

    const audio = new Audio("/audio/reprovado.mp3");
    audio.play();

    return;
  }
  if (soma >= 15) {
    const media = soma / 3;
    const notaNecessaria = 10 - media;

    this.resultado = 
      `Você foi para a final. Precisa tirar acima de ${notaNecessaria.toFixed(2)} para passar de final.`;

    return;
  }
}
}
