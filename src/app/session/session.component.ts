import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Customer } from '../ts/Customer';
import { Address } from '../ts/Address';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  @Input() username!: string;
  customer!: Customer;
  cities: string[] = [];
  add!: Address;
  @Input() address!: string;
  @Input() address2!: string;
  @Input() district!: string;
  @Input() postal_code!: number;
  @Input() phone!: number;

  selected: string = '';

  @Input() firstname!: string;
  @Input() lastname!: string;
  @Input() email!: string;



  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCities();
  }

  Login(){
    this.http.get<any>("http://localhost:8080/costumer/" + this.username).toPromise().then(data =>{
      
      this.customer = data;
      console.log(this.customer);
      this.loadLocalStorage(this.customer.customer_id, this.customer.first_name, this.customer.last_name);
      this.router.navigate(['/payment']);
    });
    
  }

  loadLocalStorage(cid: any, first: any, last: any){
    var customer_ID: string = cid;
    var name: string = first +" "+last;

    localStorage.setItem('customer_ID', customer_ID);
    localStorage.setItem('customer', name);
  }

  getCities() {
    var idc = localStorage.getItem('country_ID');
    this.http.get<any>("http://localhost:8080/costumer/city/" + idc).toPromise().then(data =>{
        this.cities = data;
    });
      
  }

  InsertAdd(){
    var ida: string;
    var jsondata = {
      address: this.address,
      address2: this.address2,
      district: this.district,
      city: this.selected,
      postal_code: this.postal_code,
      phone: this.phone 
    }
    this.http.post("http://localhost:8080/customer/addAddress", jsondata).toPromise().then((data: any) =>{
      Object.keys(data).forEach((key) => {
        console.log(data[key]); 
        ida = data[key];
      });
      localStorage.setItem('address_ID', ida);
    });
    
    
  }

  InsertCustomer(){
    var ids = localStorage.getItem('storage_ID');
    var jsondata = {
      store_id: parseInt(ids!),
      first_name: this.firstname,
      last_name: this.lastname,
      email: this.email,
      address_id: parseInt(localStorage.getItem('address_ID')!),
      active: 1
    }

    console.log(jsondata);
    this.http.post("http://localhost:8080/customer/addCustomer", jsondata).toPromise().then(data =>{
      console.log(data);
      //alert(data);
    });
  }

}

