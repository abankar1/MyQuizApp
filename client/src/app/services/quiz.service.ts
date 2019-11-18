import { Injectable } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Question } from '../models/Question';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  submitScore() {
    throw new Error("Method not implemented.");
  }

  //  user={
  //   "name":"Akshay",
  //   "email":"akshay@test.com",
  //   "password":"akshay"
  // }
  flag=false;
  selectedCategory:string;
  categories;
  questions:Question[];
  seconds: number;
  timer;
  progress: number;
  url:string="./assets/data/";
  serverUrl:string="http://localhost:3000";
  correctAnsCount=0;
  selectedAns:number[]=new Array(5);
  user;  

  constructor(private http:HttpClient) { }
  getQuestions():Observable<Question[]>{
    if(this.selectedCategory=="music"){
      //console.log(this.http.get<Question[]>(this.serverUrl+"/music"));
      return this.http.get<Question[]>(this.serverUrl+"/categories/music");
    }
    else if(this.selectedCategory=="movies")
    {
      return this.http.get<Question[]>(this.serverUrl+"/categories/movies");
    }
    else
    {
      return this.http.get<Question[]>(this.serverUrl+"/categories/technology");
    }
  }
  getAnswers(){
   // console.log(this.questions);
    return this.questions.map(x=>x.answer);
  }
  getUserName(){
    return this.user.name;
  }
  displayTimeElapsed(){
    return Math.floor(this.seconds/3600)+'h : '+Math.floor(this.seconds/60)+'m : '+Math.floor(this.seconds%60)+'s';
  }
  validateLogin(email:string, password:string)
  {
    var body={
      "email":email,
      "password":password
    }

    const header=new HttpHeaders({'Content-Type':'application/json'});
    const options={
      headers: header
    }
    return this.http.post(this.serverUrl+"/login",body,options);
   
  }
  getQuizCategories() {
    const header=new HttpHeaders({'Content-Type':'application/json'});
    const options={
      headers: header
    }
    return this.http.get(this.serverUrl+"/categories",options);
    // .toPromise()
    // .then(
    //   data=>{
    //     var categoriesObject=JSON.parse(JSON.stringify(data));
    //     //var categoriesObject=JSON.parse(data);
    //     this.categories=categoriesObject.categories;
    //     console.log("Categories:"+this.categories);
    //     return this.categories;
    //   }
    // )
   
    //console.log("Categories:"+this.categories);
    
  }
  getResult(){
    const header=new HttpHeaders({'Content-Type':'application/json'});
    const options={
      headers: header
    }
    var body={
      "questions":this.questions,
      "selectedAns":this.selectedAns
    }
    return this.http.post(this.serverUrl+'/result', body, options);
  }
}