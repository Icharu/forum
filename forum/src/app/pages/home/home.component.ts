import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class HomeComponent implements OnInit {
      frases: SafeHtml[] = [];

  rawFrases: string[] = [
    '<strong>Bem vindo</strong>',
    '<strong>O curso de engenharia da computação sempre terá bastante <span class="shine">potencial.</span></strong>',
    '<strong>Por isso, decidi fazer essa plataforma para compartilharmos nossas ideias</strong>',
    '<strong>Esse é um projeto para os alunos, por alunos,sempre alunos</strong>',
    '<strong>Junte-se a nós e faça parte dessa comunidade incrível!</strong>',
    ''
  ];


  
    constructor(private router: Router, private sanitizer: DomSanitizer) { }
    indice = 0;
    mostrarFormulario = false;

    ngOnInit() {
        this.trocarAutomaticamente();
        this.frases = this.rawFrases.map(f =>
            this.sanitizer.bypassSecurityTrustHtml(f)
    );
        this.digitarFrase();
    }
    nome = "";
    email = "";
    senha = "";
    confirmarSenha = "";
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
      setTimeout(() => this.digitarFrase(), 50);
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