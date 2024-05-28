import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-confierm-email',
  templateUrl: './confierm-email.component.html',
  styleUrls: ['./confierm-email.component.css']
})
export class ConfiermEmailComponent {
  done=""
constructor(private parms:ActivatedRoute,private http:ServicesService){
this.parms.params.subscribe(data=>{
  var id=data["id"];
  var token=decodeURIComponent(data['token']);;
  this.http.confiermEmail(id,token).subscribe((response)=>{
    console.log("done")
  },
(error)=>{
  console.log(error)
})
console.log(id,token)
})
}
}
