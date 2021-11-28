import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() {
   
  }

  ngOnInit(): void {
    
  }

  imageC: string = "assets/img/canada.png";
  imageA: string = "assets/img/australia.png"

}
