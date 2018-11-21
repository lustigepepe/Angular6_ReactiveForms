import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})

export class TableComponent implements OnInit {
  data: Array<Object>[] = [];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
      this.dataService.getJSON().subscribe(data => {
          this.data = data;
      });
  }
  editClick(id): void {
    this.router.navigateByUrl("/edit/"+id);
  }
 
}