import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isMenuVisible:boolean=false;

  toggleMenu(){
    this.isMenuVisible=!this.isMenuVisible;
  }

}
