import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //quizcatArray: IQuizCategory[] = null;
  quizCategories:any[];
  selectedCategory:string;
  constructor(private qs:QuizService, private router: Router) { }

  ngOnInit() {
      //this.quizcat.getQuizCategories().subscribe((data) => this.quizcatArray = data);
      this.selectedCategory="technology";
      console.log("flag="+this.qs.flag);
      if(!this.qs.flag)
      {
        this.router.navigate(['/login']);
      }
      this.qs.getQuizCategories().subscribe(
        data=>{
          var categoriesObject=JSON.parse(JSON.stringify(data));
        //var categoriesObject=JSON.parse(data);
        this.quizCategories=categoriesObject.categories;
        console.log("Categories:"+this.quizCategories);
        //return this.categories;
        }
      );
      
  }
  onItemChange(value){
   console.log(" Value is : ", value );
  }

  radioChangeHandler(event: any)
  {
    this.selectedCategory=event.target.value;
    //console.log(this.selectedCategory);
    this.qs.selectedCategory=this.selectedCategory.toLowerCase();
  }
  onSubmit(){
    //console.log("The selected cat is ",this.selectedCategory);
    this.router.navigate(['/quizpage']);
    // if(this.selectedCategory=="music"){
        

    // }
    //console.log("The selected cat is ",this.selectedcat);
  }

}
