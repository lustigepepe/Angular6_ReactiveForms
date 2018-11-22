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
  dateFormatOne: boolean = true;

  constructor(private dataService: DataService, private router: Router) { }
  slash
  dataSubscriber;
  ngOnInit(): void {
    console.log('dateFormatOne: '+ this.dateFormatOne);
    this.dataSubscriber = this.dataService.getJSON().subscribe(data => {
          this.data = data;
      });
      this.dataService.currentData.subscribe(data => {
        if(data !== 'null') {
          if(!this.dataSubscriber.closed) {
            this.dataSubscriber.unsubscribe();
            this.dateFormatOne = false;
          }
          this.data = JSON.parse(data);
        }
      });
  }
  editClick(id): void {
    this.router.navigateByUrl("/edit/"+id);
  }

}