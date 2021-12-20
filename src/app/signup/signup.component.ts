import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm !:FormGroup
  constructor(private fb:FormBuilder,private http:HttpClient, private route:Router) { }
  
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: new FormControl("",[Validators.required,Validators.maxLength(15),Validators.minLength(1)]),
      email: new FormControl("",[Validators.required,Validators.email]),
      mobile: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required,Validators.minLength(2)]),
    })

  }

  // Make Method to create User 
  signup(){
    this.http.post<any>("http://localhost:3000/User",this.signUpForm.value).subscribe(res=>{
      alert("Registration Successfully !")
      this.signUpForm.reset()
      this.route.navigate(['login'])
    }, err=>{
      alert("kuch to gadbad hee")
    }
    )
  }


}
