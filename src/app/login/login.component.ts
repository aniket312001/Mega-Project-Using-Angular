import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private http:HttpClient,private router:Router) { }
  loginForm !: FormGroup

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email:[''],
      password:['']
    })

  }

  //Login method

  login(){
    this.http.get<any>("http://localhost:3000/User").subscribe(res=>{
      const user = res.find((a:any)=>{
        return (a.email === this.loginForm.value.email)  && (a.password === this.loginForm.value.password)
      })
      if(user){
        alert("login Successfull")
        this.router.navigate(['restaurent'])
      }else{
        alert("Invalid User")
      }
    },err=>{
      alert("kuch to gadbad hee")
    })
  }

}
