import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { Data } from '../data';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class DataService {
    private dataUrl = './assets/data.json';  // URL to web api

    private updataJSONData = new BehaviorSubject('null');
    currentData = this.updataJSONData.asObservable();
  
    constructor(private http: HttpClient) {}
    
    updataData(message: string) {
        this.updataJSONData.next(message)
      }
    
    public getJSON(): Observable<any> {
        return this.http.get(this.dataUrl);
    }
    
    public updateJSON(data: any): Observable<any> {
        return this.http.put(this.dataUrl, data, httpOptions).pipe(
            tap(_ => console.log(`update data: success`))
        );
    }
}