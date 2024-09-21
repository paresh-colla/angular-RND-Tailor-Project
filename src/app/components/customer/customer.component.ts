import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  data: Object | undefined;


  constructor(
    private http: HttpClient
  ) {
    
  }
  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/employee')
      .subscribe(response => {
        this.data = response;
        console.log(this.data)
      });
  }
}
