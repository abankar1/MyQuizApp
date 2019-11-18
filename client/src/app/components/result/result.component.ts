import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private qs: QuizService, private router: Router) { }
  data:number[];
  imageUrl:string;
  ngOnInit() {
    
    if(!this.qs.flag)
      {
        this.router.navigate(['/login']);
      }
     // this.data=this.qs.getAnswers();
     // console.log(this.data);
      
      if(this.qs.correctAnsCount>=3)
      {
        this.imageUrl="../../../assets/img/hurray.jpg";
      }
      else
      {
        this.imageUrl="../../../assets/img/sorry.jpg";
      }
      //return this.qs.correctAnsCount;
    
  }

  OnSubmit(){
    // this.qs.submitScore();//.subscribe(()=>{

    //   this.restart();
    // });
  }
  restart(){
    this.qs.correctAnsCount=0;
    this.router.navigate(['/quizpage']);
  }


}
