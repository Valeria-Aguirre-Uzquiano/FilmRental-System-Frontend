import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { Film } from '../ts/film';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  id: string | null | undefined;
  DebutFilms: Film[] = [];
  LastRental: Film[] = [];
  MaxRental: Film[] = [];


  cart!: number;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { 

  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const httprequest = "http://localhost:8080/film/debut/"+ this.id;
    const httprequest2 = "http://localhost:8080/film/lastrental/"+ this.id;
    const httprequest3 = "http://localhost:8080/film/maxrental/"+ this.id;
    this.getDebutFilms(httprequest);
    this.getLastRental(httprequest2);
    this.getMaxRental(httprequest3);
    this.getShopCart();
    //console.log( httprequest);
  } 

  getDebutFilms(httprequest: string): void{
    this.http.get<any>(httprequest).subscribe(
      response => {
        this.DebutFilms = response;
        //console.log("films = "+ this.DebutFilms);
      } 
    );
    
  }

  getLastRental(httprequest: string): void{
    this.http.get<any>(httprequest).subscribe(
      response => {
        this.LastRental = response;
      } 
    );
  }

  getMaxRental(httprequest: string): void{
    this.http.get<any>(httprequest).subscribe(
      response => {
        this.MaxRental = response;
      } 
    );
  }

  addCarrito(index: number){
    var httprequest = "http://localhost:8080/film/rental/addFilm/" + index;
    this.http.post(httprequest,{responseType:'text', observe: 'response'}).subscribe(
      response =>{
        console.log("response=" +response);
        alert("Película añadida al carrito");
        window.location.reload();
      }
    );
    console.log("Film id = "+ index);
  }

  getShopCart(){
    this.http.get<any>("http://localhost:8080/film/rental").subscribe(
      response => {
        console.log("length carrito = "+ response.length);
        this.cart = response.length;
      }
    );
  } 
}