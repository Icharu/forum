import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule]
})
export class HomeComponent implements AfterViewInit {
      frases: SafeHtml[] = [];

  rawFrases: string[] = [
    '  ',
    '',
    '<strong>Bem vindo</strong>',
    '<strong>O curso de engenharia de computação sempre terá bastante <span class="shine">potencial.</span></strong>',
    '<strong>Por isso, decidi fazer essa plataforma para compartilharmos nossas ideias</strong>',
    '<strong>Esse é um projeto para os alunos, por alunos, sempre alunos</strong>',
    '<strong>Junte-se a nós e faça parte dessa comunidade incrível!</strong>',
    '<strong>Somos juntos e seremos a melhor comunidade de computação do Maranhão.</strong>',
    '   ',
    ''
  ];
    loginForm!: FormGroup;
    showButton = false;
    showButton1 = false;
    constructor(
      private router: Router, private sanitizer: DomSanitizer,private authService: AuthService,
    private loginService: LoginService
    ) {
        this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });  
    }
    indice = 0;
    mostrarFormulario = false;
    ngAfterViewInit() {
  this.frases = this.rawFrases.map(f =>
    this.sanitizer.bypassSecurityTrustHtml(f)
  );

  setTimeout(() => {
    this.trocarAutomaticamente();
    this.digitarFrase();
  });
    setTimeout(() => {
    this.showButton = true;
  }, 6000);
    setTimeout(() => {
    this.showButton1 = true;
  }, 3000);
}
    textoDigitado: SafeHtml = '';
    indiceFrase = 0;
    indiceLetra = 0;
    trocarAutomaticamente() {
        const intervalTime = 3000;

        const interval = setInterval(() => {
        if (this.indice < this.frases.length - 1) {
            this.indice++;
        } else {
            clearInterval(interval);
            this.mostrarFormulario = true;
        }
        }, intervalTime);
    }
    track() {
        return Math.random();
    }
    VerForum() {
        this.router.navigate(['/forum']);
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
        } else {
          this.mostrarFormulario = true;
        }
      }, 1500); 
    }
  }
}