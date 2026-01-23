import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ForumComponent } from './pages/forum/forum.component';
import { CursoComponent } from './pages/curso/curso.component';
import { CreditosComponent } from './pages/creditos/creditos.component';
import { AuthGuard } from './auth.guard';
import { FaqsComponent } from './pages/faq/faq.component';
import { TurmasComponent } from './pages/turmas/turmas.component';
import { VidaComponent } from './pages/vida/vida.component';
import { CalcComponent } from './pages/calc/calc.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CalcCRComponent } from './pages/calccr/calccr.component';
export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        component: ForumComponent
    },
    {
        path: 'curso',
        component: CursoComponent
    },
    {
        path: 'creditos',
        component: CreditosComponent
    },
    {
        path: 'faqs',
        component: FaqsComponent
    },
    {
        path: 'faqs/calc',
        component: CalcComponent
    },
    {
        path: 'turmas',
        component: TurmasComponent
    },
    {
        path: 'vida',
        component: VidaComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'simulador',
        component: CalcCRComponent
    }
];
