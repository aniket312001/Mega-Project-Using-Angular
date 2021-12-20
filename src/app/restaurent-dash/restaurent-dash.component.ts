import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent_model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  
  formValue!:FormGroup

  restaurentModelObj: RestaurentData = new RestaurentData()  // creating object of Resto layout

  constructor(private fb:FormBuilder, private api_service : ApiService) { }


  showAdd:boolean = true
  showbtn!:boolean

  ngOnInit(): void {

    this.formValue = this.fb.group({
      name : [''],
      email : [''],
      mobile : [''],
      address : [''],
      service : [''],

    })
    
  this.getAllData()
    
  }



  // now we are Subscribing Our Data which is maped in service 

  addResturent(){
    this.showAdd = true
    this.showbtn = false
    this.restaurentModelObj.name = this.formValue.value.name
    this.restaurentModelObj.email = this.formValue.value.email
    this.restaurentModelObj.mobile = this.formValue.value.mobile
    this.restaurentModelObj.address = this.formValue.value.address
    this.restaurentModelObj.service = this.formValue.value.service
    this.restaurentModelObj.name = this.formValue.value.name


    this.api_service.postRestaurent(this.restaurentModelObj).subscribe(res=>{    // it will add the value
      console.log(res)
      alert("Restaurent Records Added Successfully !!")
      this.formValue.reset()
      this.getAllData()  // it will load in the table
    })
  }




  // Get All Data

  allData:any
  getAllData(){
    this.api_service.getRestaurent().subscribe(res=>{
      this.allData = res
    })
  }



  // Delete Data 

  deleteResto(id:number){
    this.api_service.deleteRestaurent(id).subscribe(res=>{
      alert("Data has been deleted Successfully !!")

      this.getAllData()  // it will load in the table
    })
  }


//Update
  
  onEditResto(data:any){
    this.showAdd = false
    this.showbtn = true    
    this.formValue.controls['name'].setValue(data.name)  // it will get the data on form 
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['address'].setValue(data.address)
    this.formValue.controls['mobile'].setValue(data.mobile)
    this.formValue.controls['service'].setValue(data.service)
 
    this.restaurentModelObj.id = data.id
  }



  updateResto(){
    
    this.restaurentModelObj.name = this.formValue.value.name
    this.restaurentModelObj.email = this.formValue.value.email
    this.restaurentModelObj.mobile = this.formValue.value.mobile
    this.restaurentModelObj.address = this.formValue.value.address
    this.restaurentModelObj.service = this.formValue.value.service
    this.restaurentModelObj.name = this.formValue.value.name


    console.log(this.restaurentModelObj.id)
    this.api_service.updateRestaurent(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
      alert("Data is Updated Successfully")
      this.formValue.reset()
      this.getAllData() // it will load in the table

    })
  }


  showAddButton(){
    this.showAdd = true
    this.showbtn = false
    this.formValue.reset()
  }


}
