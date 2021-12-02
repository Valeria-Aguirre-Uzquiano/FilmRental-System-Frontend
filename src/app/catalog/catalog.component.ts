import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { Film } from '../ts/Film';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  id!: string | null | undefined;
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
    this.loadLocalStorage();
    //console.log( httprequest);
  } 

  loadLocalStorage(){
    var customer_ID: string = '0';
    var name: string = '';
    var storage_ID: string = '';
    if(this.id == '20'){
      storage_ID = '1';
    }else if(this.id == '8'){
      storage_ID = '2';
    }

    localStorage.setItem('customer_ID', customer_ID);
    localStorage.setItem('customer', name);
    localStorage.setItem('storage_ID', storage_ID);
    localStorage.setItem('country_ID',String(this.id));
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