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
@Component({
    selector: 'app-curso',
    templateUrl: './curso.component.html',
    styleUrls: ['./curso.component.css'],
    standalone: true,
    imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule]
})
export class CursoComponent implements OnInit {



  
    constructor(private router: Router, private sanitizer: DomSanitizer, private http: HttpClient, private pdfService: PdfDownloadService) { }
    opened: boolean = true;
    ngOnInit() {
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
}