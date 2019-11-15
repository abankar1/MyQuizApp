import { Component, OnInit, wtfStartTimeRange } from '@angular/core';
//import { Question } from '../../models/Question';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizpage',
  templateUrl: './quizpage.component.html',
  styleUrls: ['./quizpage.component.css']
})
export class QuizpageComponent implements OnInit {

  constructor(private qs:QuizService, private router:Router) { }

  ngOnInit() {
    if(!this.qs.flag)
      {
        this.router.navigate(['/login']);
      }
  
    this.qs.seconds=0;
    this.qs.progress=0;
    this.qs.timer=0;
    this.qs.getQuestions().subscribe((data:any)=>{
      console.log(data);
      this.qs.questions=data;
      console.log("Data from angular+"+JSON.stringify(data));
      this.startTimer();
      //console.log(this.qs.questions);

    });
    
    this.qs.timer=setInterval(()=>{
      this.qs.seconds++;
      if(this.qs.seconds>90)
      {
        this.qs.flag=false;
        clearInterval(this.qs.timer);
        this.router.navigate(['/login']);
      }
    },1000);

    
  }
  startTimer(){
    
  }
  Answer(choice){

    //console.log("choice:"+choice);
    this.qs.selectedAns[this.qs.progress]=choice;
   // console.log("Selected Ans:"+this.qs.selectedAns[this.qs.progress]);
    this.qs.progress++;
    if(this.qs.progress==5){
      clearInterval(this.qs.timer);
      this.router.navigate(['/result']);
    }
  }
  BackPressed(){
    if(this.qs.progress!=0){
    this.qs.progress--;
    }
  }
  NextPressed(){
    if(this.qs.progress<4){
      //console.log(this.qs.progress);
      this.qs.selectedAns[this.qs.progress]=-1;
    this.qs.progress++;
    console.log(this.qs.progress);
    }
    else
    {
      //console.log("reached");
      clearInterval(this.qs.timer);
      this.router.navigate(['/result']);
    }
  }
}
