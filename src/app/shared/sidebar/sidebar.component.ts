import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems:any[];

  constructor(private SidebarService:SidebarService, private router: Router) {
    this.menuItems = SidebarService.menu;
   }

  ngOnInit(): void {
  }

  salida(){
    this.router.navigateByUrl('/login');
  }

}
