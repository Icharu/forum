import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { PdfDownloadService } from '../../services/pdfdownload.service';
import { Materia } from '../../models/cr.model';

@Component({
    selector: 'app-calccr',
    templateUrl: './calccr.component.html',
    styleUrls: ['./calccr.component.css'],
    standalone: true,
    imports: [MatIconModule, FormsModule, CommonModule]
})
export class CalcCRComponent implements OnInit {

  showButton = false;
  sidebarOpen = true;
  isAdmin: boolean = false;

  resultado: string = '';
  nota1: number = 0;
  nota2: number = 0;
  nota3: number = 0;

  materias: Materia[] = [];
  novaMateria: Materia = { nome: '', creditos: 0, media: 0 };

  rawFrases: string[] = ['<strong>Simulador de CR, Rendimento Acadêmico</strong>'];
  textoDigitado: SafeHtml = '';
  indiceFrase = 0;
  isMobile = false;
  indiceLetra = 0;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private pdfDownloadService: PdfDownloadService
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

  adicionarMateria() {
    if (this.novaMateria.creditos > 0) {
      this.materias.push({ ...this.novaMateria });
      this.novaMateria = { nome: '', creditos: 0, media: 0 };
    }
  }

  calcularCR(): number {
    let somaPesos = 0;
    let somaCreditos = 0;
    for (const materia of this.materias) {
      somaPesos += materia.media * materia.creditos;
      somaCreditos += materia.creditos;
    }
    return somaCreditos === 0 ? 0 : somaPesos / somaCreditos;
  }

  calcular() {
    const soma = this.nota1 + this.nota2 + this.nota3;
    const media = soma / 3;

    if (soma >= 21) {
      this.resultado = `Parabéns, passou! Uhul 🎉 Média ${media.toFixed(2)}`;
      return;
    }
    if (soma < 15) {
      this.resultado = `Reprovado | Média = ${media.toFixed(2)}. Depois você consegue!`;
      const audio = new Audio('/audio/reprovado.mp3');
      audio.play();
      return;
    }
    if (soma >= 15) {
      const notaNecessaria = 10 - media;
      this.resultado = `Você foi para a final. Precisa tirar acima de ${notaNecessaria.toFixed(2)} para passar.`;
    }
  }

  download() {
    this.pdfDownloadService.download('cursos/10.pdf', '10.pdf');
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