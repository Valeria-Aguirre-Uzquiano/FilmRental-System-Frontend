import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../ts/Film';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  Carrito: Film[] = [];
  sum: number = 0.0;
  des: number = 0.0;
  total: number = 0.0;

  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.getShopCart();
  }

  getName(){
    return localStorage.getItem('customer');
  }

  getShopCart(){
    this.http.get<any>("http://localhost:8080/film/rental").subscribe(
      response => {
        this.Carrito = response;
        console.log("length carrito = "+ this.Carrito.length);
      }
    );
  }
}
