import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  errorMessage:string;

  constructor(private quizService: QuizService, private router: Router,private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.maxLength(15)]]
    });
  }
  //OnSubmit(email:string, password:string)
  OnSubmit()
  {
    //console.log(this.myForm.value.email);
    //console.log(this.myForm.value.password);
      // if(this.quizService.validateLogin(email, password))
      // {
      //   this.router.navigate(['/home']);
      //   this.quizService.flag=true;
      // }
      // else
      // {
      //   this.router.navigate(['/login'])
      //   this.quizService.flag=false;
      //   this.errorMessage="Invalid username or password";
      // }

      this.quizService.validateLogin(this.myForm.value.email, this.myForm.value.password)
      .subscribe(
        (response)=>{

          
          var res=JSON.parse(JSON.stringify(response));
          //if(response==res.user.name && response==res.user.password)
          if(response)
          {
            
            console.log("Response: ");
            this.router.navigate(['/home']);
            this.quizService.flag=true;
            this.quizService.user=res.user;
          } 
          // else
          // {
          //   console.log("Response: "+res.user.name);
          //   this.router.navigate(['/login'])
          //   this.quizService.flag=false;
          //   this.errorMessage="Invalid username or password";
          // }
        },
       (error) =>{
            this.router.navigate(['/login'])
            this.quizService.flag=false;
            this.errorMessage="Invalid username or password";

        }
      
      );
   
  }

}
