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
  list: Film[] = [];
  cus!: boolean;

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
    this.getList();
    //console.log( httprequest);
  } 

  selected(index: number){
    var sel =false;
    this.list.forEach(e => {
      if(e.filmId == index){
        sel = true;
      }
    });
    return sel;
  }

  deleteFilm(id: number){    
    console.log("id = "+ id);
    var httprequest = "http://localhost:8080/film/rental/deleteFilm/" + id;
    this.http.delete(httprequest).subscribe(
      response => {
        console.log(response);
        alert("película elminada del carrito");
        window.location.reload();
      }
    );
  }

  loadLocalStorage(){
    var customer_ID: string = '';
    var name: string = '';
    var storage_ID: string = '';
    if(this.id == '20'){
      storage_ID = '1';
    }else if(this.id == '8'){
      storage_ID = '2';
    }
    localStorage.setItem('storage_ID', storage_ID);
    localStorage.setItem('country_ID',String(this.id));
    if(!localStorage.getItem('customer_ID')){
      localStorage.setItem('customer_ID', customer_ID);
      localStorage.setItem('customer', name);
    }
    
    
  }

  getList(){
    this.http.get<any>("http://localhost:8080/film/rental").subscribe(
        response => {
          this.list = response;
        }
    );
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
    if(this.cart < 4 && this.doubleFilm(index)){
      var httprequest = "http://localhost:8080/film/rental/addFilm/" + index;
      this.http.post(httprequest,{responseType:'text', observe: 'response'}).subscribe(
        response =>{
          console.log("response=" +response);
          alert("Película añadida al carrito");
          window.location.reload();
        }
      );
      console.log("Film id = "+ index);
    }else{
      alert("Película duplicada o Carrito lleno");
    }
  }

  getShopCart(){
    this.http.get<any>("http://localhost:8080/film/rental").subscribe(
      response => {
        console.log("length carrito = "+ response.length);
        this.cart = response.length;
      }
    );
  } 

  getName(){
    return localStorage.getItem('customer');
  }

  getCustomer(){
    
    if( localStorage.getItem('customer_ID') == ''){
      return false;
    }else{
      return true;
    }
    
  }

  Logout(){
    localStorage.removeItem('customer_ID');
    localStorage.removeItem('storage_ID');
    localStorage.removeItem('address_ID');
    localStorage.removeItem('customer');
    window.location.reload();
  }

  doubleFilm(index: number) {
    var control = true;
    console.log("lista = " + this.list);
    this.list.forEach(e =>{
      if(e.filmId == index){
        control = false;
      }
    });

    return control;

  }
}


