import { Component, HostListener, Input, OnInit } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { PieComponent } from '../chart/pie/pie.component';
import { Chart1Component } from '../chart/chart1/chart1.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  obj:any;
  @Input() movies: any[] = [];
  ngOnInit(): void {
    this.createArray();
  }
  isSidebarOpen = true;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const button = document.querySelector('.aside_button');
    const main = document.querySelector('.main')
    if (!this.isSidebarOpen) 
    {
      button.classList.add('open');
      main.classList.add('show_main');
    } 
    else 
    {
      button.classList.remove('open');
      main.classList.remove('show_main');
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= 768) {
      this.isSidebarOpen = false;
    } else {
      this.isSidebarOpen = true;
    }
  }

  createArray() {
    this.movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
    ];
  }
  drop(event: any) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  childEvent(obj:any){
    this.obj = obj
    console.log(obj.message);
    // gelen veri burada duruyor.
  }
}
