import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Film } from '../ts/Film';
import { Customer } from '../ts/Customer';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})



export class ShopCartComponent implements OnInit {
  user!: Customer;
  
  td!: string;
  dmax!: string;
  @Input() datereturn!: string;
  sum: number = 0;
  des: number = 0;
  

  Carrito: Film[] = [];

  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient, private _location: Location) {

    var d,m,dm,aux;
    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      d = "0" + dd;
      dm = dd+8;
      if (dm < 10) {
        aux = "0" + dm;
      }
    }else{
      dm = dd+8;
      if (dm < 10) {
        aux = "0" + dm;
      }
    }

    if (mm < 10) {
      m = '0' + mm;
    } 

    if(d!=undefined && m==undefined && aux!=undefined){
      this.td = yyyy + '-' + mm + '-' + d;
      this.dmax = yyyy + '-' + mm + '-' + aux;
    }else if(d!=undefined && m==undefined && aux==undefined){
      this.td = yyyy + '-' + mm + '-' + d;
      this.dmax = yyyy + '-' + mm + '-' + dm;
    } else if(d==undefined && m!=undefined && aux!=undefined){
      this.td = yyyy + '-' + m + '-' + dd;
      this.dmax = yyyy + '-' + m + '-' + aux;
    } else if(d==undefined && m!=undefined && aux==undefined){
      this.td = yyyy + '-' + m + '-' + dd;
      this.dmax = yyyy + '-' + m + '-' + dm;
    }else if(d!=undefined && m!=undefined && aux!=undefined){
      this.td = yyyy + '-' + m + '-' + d;
      this.dmax = yyyy + '-' + m + '-' + aux;
    }else if(d!=undefined && m!=undefined && aux==undefined){
      this.td = yyyy + '-' + m + '-' + d;
      this.dmax = yyyy + '-' + m + '-' + dm;
    }else if(aux!=undefined){
      this.td = yyyy + '-' + mm + '-' + dd;
      this.dmax = yyyy + '-' + mm + '-' + aux;
    } else{
      this.td = yyyy + '-' + mm + '-' + dd;
      this.dmax = yyyy + '-' + mm + '-' + dm;
    }
    console.log("Fechar: " +this.td);
    console.log("Fecham: " +this.dmax);
    
    
    
  }

  ngOnInit(): void {
    this.getShopCart();
    //this.user.customer_id;
    //this.getDates();
  }

  getShopCart(){
    this.http.get<any>("http://localhost:8080/film/rental").subscribe(
      response => {
        this.Carrito = response;
        console.log("length carrito = "+ this.Carrito.length);
      }
    );
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

  back(){
    this._location.back();

  }

  calculateDiff(){
    var dp = this.td.split("-");
    var dpr,res;
    if(this.datereturn!=null){
      dpr  = this.datereturn.split("-");
      res = Math.floor((Date.UTC(parseInt(dp[0]), parseInt(dp[1]), parseInt(dp[2])) - Date.UTC(parseInt(dpr[0]), parseInt(dpr[1]), parseInt(dpr[2])) ) /(1000 * 60 * 60 * 24));
    }
    return res;
  }
  
  Calculate(){
    var du: any;
    var d: number;
    console.log("selected: "+this.datereturn);
    var dif = this.calculateDiff();
    if(dif!=undefined){
      du = ((-dif)-1);
      console.log("difrerencia = "+ du);
      this.Carrito.forEach(e =>{
        this.sum = this.sum + (e.rental_rate * du);
      });

      if(this.sum > 20){
        this.des = this.sum * 0.2; 
      }else if (this.sum > 15){
        this.des = this.sum * 0.15; 
      }else if (this.sum > 10){
        this.des = this.sum * 0.1; 
      }

    }
  }

  routingPay(){
    var cus = localStorage.getItem("customer_ID");
    console.log("cus id = "+ cus);
    if(cus == '0'){
      this.router.navigate(['/session']);
    }else{
      this.router.navigate(['/payment']);
    }
  }
}


