import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { Router } from '@angular/router';
@Component({
    selector: 'app-creditos',
    templateUrl: './creditos.component.html',
    styleUrls: ['./creditos.component.css'],
    standalone: true,
    imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule]
})
export class CreditosComponent implements OnInit {



  
    constructor(private router: Router, private sanitizer: DomSanitizer) { }
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
}