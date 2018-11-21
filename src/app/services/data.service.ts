import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { Data } from '../data';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class DataService {
    private dataUrl = './assets/data.json';  // URL to web api

    constructor(private http: HttpClient) {}
    
    public getJSON(): Observable<any> {
        return this.http.get(this.dataUrl);
    }
    
    public updateJSON(data: any): Observable<any> {
        return this.http.put(this.dataUrl, data, httpOptions).pipe(
            tap(_ => console.log(`update data: success`))
        );
    }
}