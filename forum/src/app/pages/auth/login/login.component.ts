import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    CommonModule,
    MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
    
   loginForm: FormGroup;
   showButton = false;
    username = '';
    password = '';
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private snackBar: MatSnackBar, private sanitizer: DomSanitizer) {

        this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required]]
    });
  }
  frases: SafeHtml[] = [];
  rawFrases: string[] = [
    '<strong>Bem vindo ao Fórum</strong>'
  ];
    textoDigitado: SafeHtml = '';
    indiceFrase = 0;
    indiceLetra = 0;
    isAdmin: boolean = false;
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
    this.isAdmin = this.userService.getIsAdmin();
}
    submit() {
    if (this.loginForm.invalid) {
      this.snackBar.open('Coloque os dados corretamente!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }
    const { username, password } = this.loginForm.value;
    this.userService.login({ username, password })
    .subscribe({
        next: (res) => {
  const token = res.replace('? Token: ', '').trim(); // remove prefixo da string
  this.userService.savetoken(token);

  this.router.navigate(['/forum']);
  this.snackBar.open('Sucesso!', 'Close', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['custom-snackbar']
  });
},

        error: (err) => {
            console.error(err);
            this.snackBar.open('Nome de usuário ou senha estão incorretos.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
          });
        }
    })
  }
    navigate() {
    console.log('=== NAVIGATE CHAMADO ===');
    console.log('Tentando navegar para /register...');

    this.router.navigate(['/register']).then(
      (success) => {
        console.log('Navegação para register bem-sucedida:', success);
      },
      (error) => {
        console.error('Erro na navegação para register:', error);
      }
    );
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
        this.router.navigate(['/']);
    }
    IrParaTurmas() {
        this.router.navigate(['/turmas']);
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
  IrParaFaqs() {
        this.router.navigate(['/faqs']);
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
  IrParaAdmin() {
    this.router.navigate(['/admin'])
  }
  IrParaSimulador() {
    this.router.navigate(['/simulador'])
  }
}
