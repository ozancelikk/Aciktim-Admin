import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listrestaurant',
  templateUrl: './listrestaurant.component.html',
  styleUrls: ['./listrestaurant.component.css']
})
export class ListrestaurantComponent implements OnInit {
  isChecked: boolean;
  ngOnInit(): void {
    
  }
  toggleEditable() {
    this.isChecked = !this.isChecked;
  }

}
