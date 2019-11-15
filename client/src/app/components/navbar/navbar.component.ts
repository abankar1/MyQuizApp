import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private qs : QuizService,private router : Router) { }

  username:string;
  ngOnInit() {
    //this.username=this.qs.getUserName();
  }

  SignOut() {
    this.qs.flag=false;
    clearInterval(this.qs.timer);
    this.router.navigate(['/login']);
  }

  ChangeCategory(){
    clearInterval(this.qs.timer);
    this.router.navigate(['/home']);
    this.qs.selectedCategory="technology";
  }
}
