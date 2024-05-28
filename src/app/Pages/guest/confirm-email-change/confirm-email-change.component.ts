import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-email-change',
  templateUrl: './confirm-email-change.component.html',
  styleUrls: ['./confirm-email-change.component.css']
})
export class ConfirmEmailChangeComponent {
constructor(private parms:ActivatedRoute,private http :HttpClient){
  this.parms.params.subscribe(data=>{
    var id=data["id"];
    var token=decodeURIComponent(data['token']);
    var newEmail=data["newEmail"]

    const url = `http://corzacademy.runasp.net/api/Users/confirm-new-email/${id}/${token}/${newEmail}`;
    this.http.post(url, {}).subscribe((response:any)=>{
      Swal.fire({
        title: "success",
        text: response,
        icon: "success"
      });    
    })
   
  })

}
}
