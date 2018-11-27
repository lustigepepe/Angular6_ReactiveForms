import { Component, OnInit} from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../data';

// import { DateValidator } from '../validation.service';
import { Router } from '@angular/router';
import * as moment from "moment";

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.css']
})

export class EditComponent implements OnInit {
  itemData = new Data();
  allData  : Array<Object> = [];
  itemCount : number = 0;
  submitted: boolean = false;
  dataJSON: string;
  wrongDateTime: boolean = false;

  products = [{'id':1, 'name':'Product 1'},
    {'id':2, 'name': 'Product 2'}, {'id':3, 'name': 'Product 3'},
    {'id':8, 'name': 'Product 8'},{'id':10, 'name': 'Product 10'}];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
  ) {}
  
  editForm = this.fb.group({
    euro:['', Validators.required],
    dateTime:['', Validators.required],
    freeclick: false,
  });
  networkForm = new FormGroup({
    network: new FormControl('a', Validators.required)
  });
  plistaProduct = new FormGroup({
    products: new FormControl({'id':1, 'name': 'Product 1'})
  });

  ngOnInit(): void {
    this.getEditData();
  }
  
  updateData() {
    this.dataService.updataData(JSON.stringify(this.allData));
    this.router.navigateByUrl("/");

  }
  getEditData(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    let allData : Array<Object> = [];
    this.dataService.getJSON().subscribe(data => {
      this.allData = data;
      for (let entry of data) {
        if(entry.a === id) {
          this.itemData = entry
          break;
        }
        this.itemCount++;
      }
    });
  }

  get f() { return this.editForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.wrongDateTime = false;

    let str: string = this.editForm.value.dateTime;    
    str = str.replace(/\./g, '/');
    const val = moment(str, "DD/MM/YYYY / HH:mm", true);
    console.log(this.editForm.controls.euro.touched);
    console.log(!val.isValid());
    if (this.editForm.controls.dateTime.touched && !val.isValid()) {
    console.log('!val.isValid()');
      
      this.wrongDateTime = true;
      return;
    }

    if (this.editForm.invalid) {
      return;
    }
    
    let newDate = moment(str, "DD/MM/YYYY / HH:mm", true).format()
    this.itemData.camp_cpc = this.editForm.value.euro;
    this.itemData.date = newDate;
    // this.itemData.date = this.editForm.value.dateTime;
    this.itemData.network = this.networkForm.value.network;
    this.itemData.freeclick = this.editForm.value.freeclick;
    this.itemData.PlistaProduct = this.plistaProduct.value.products.name;
    this.allData[this.itemCount] = this.itemData;
    
    console.log('Result after edited:');
    console.log(this.allData);
    this.dataService.updataData(JSON.stringify(this.allData));

    this.router.navigateByUrl("/");

  }
}