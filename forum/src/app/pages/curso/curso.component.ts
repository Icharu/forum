import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PdfDownloadService } from '../../services/pdfdownload.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-curso',
    templateUrl: './curso.component.html',
    styleUrls: ['./curso.component.css'],
    standalone: true,
    imports: [MatIconModule, CommonModule]
})
export class CursoComponent implements OnInit {

  showButton = false;
  sidebarOpen = true;
  isAdmin: boolean = false;

  rawFrases: string[] = ['<strong>Estrutura Curricular</strong>'];
  textoDigitado: SafeHtml = '';
  indiceFrase = 0;
  indiceLetra = 0;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private pdfService: PdfDownloadService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.digitarFrase();

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

  download1() { this.pdfService.download('cursos/1.pdf', '1.pdf'); }
  download2() { this.pdfService.download('cursos/2.pdf', '2.pdf'); }
  download3() { this.pdfService.download('cursos/3.pdf', '3.pdf'); }
  download4() { this.pdfService.download('cursos/4.pdf', '4.pdf'); }
  download5() { this.pdfService.download('cursos/5.pdf', '5.pdf'); }
  download6() { this.pdfService.download('cursos/6.pdf', '6.pdf'); }
  download7() { this.pdfService.download('cursos/7.pdf', '7.pdf'); }
  download8() { this.pdfService.download('cursos/8.pdf', '8.pdf'); }
  download9() { this.pdfService.download('cursos/9.pdf', '9.pdf'); }

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
}