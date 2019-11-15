import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuizpageComponent } from './components/quizpage/quizpage.component';
import { ResultComponent } from './components/result/result.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'quizpage', component:QuizpageComponent},
  {path: 'result', component:ResultComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
