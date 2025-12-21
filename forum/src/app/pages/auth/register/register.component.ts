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
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    CommonModule,
    MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent implements OnInit {
    
   signupForm!: FormGroup;
   showButton = false;
    username = '';
    password = '';
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private snackBar: MatSnackBar, private sanitizer: DomSanitizer) {
        this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  
  frases: SafeHtml[] = [];
  rawFrases: string[] = [
    '<strong>Bem vindo ao Fórum</strong>'
  ];
  isAdmin: boolean = false;
    textoDigitado: SafeHtml = '';
    username1: string = 'Não logado';
  isLogged: boolean = false;
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
          this.isLogged = this.userService.isLoggedIn();
      const name = this.userService.getUsername();
    if (name) {
      this.username1 = name;
    }
    this.isAdmin = this.userService.getIsAdmin();
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


  submit() {
    if (this.signupForm.invalid) {
      this.snackBar.open('⚠️ Preencha todos os campos corretamente.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar']
      });
      return;
    }

    const { username, password, confirmPassword } = this.signupForm.value;

    if (password !== confirmPassword) {
      this.snackBar.open('⚠️ As senhas não coincidem.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar']
      });
      return;
    }
    const isAdmin = false;
    this.userService.RegisterUser({ username, password, isAdmin }).subscribe({
        next: (res) => {
      this.snackBar.open(res, 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar']
      });
      this.router.navigate(['/forum']);
    },
      error: (err) => {
        console.error(err);
        this.snackBar.open('❌ Erro ao registrar. Tente novamente.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
      }
    });
  }

  navigate() {
    this.router.navigate(["/login"]);
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
