import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  //Create restaurent using Post method

  postRestaurent(data:any){
    return this.http.post<any>("http://localhost:3000/Restaurent",data).pipe(map((res:any)=>{
      return res
    }))
  }


  //Get Restaurent using GET method

  getRestaurent(){
    return this.http.get<any>("http://localhost:3000/Restaurent").pipe(map((res:any)=>{
      return res
    })
  )}


  //Update Restaurent using Put method
  
  updateRestaurent(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/Restaurent/"+id,data).pipe(map((res:any)=>{
      return res
    }))
  }


  // Deleting Restaurent using Delete method

    deleteRestaurent(id:number){
      return this.http.delete<any>("http://localhost:3000/Restaurent/"+id).pipe(map((res:any)=>{
        return res
      }))
    }



}
