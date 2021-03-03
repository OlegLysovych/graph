import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Graph } from '../Data/Graph';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  baseUrl = 'http://localhost:5000/weatherforecast';

constructor(private http: HttpClient) { }

  getGraph() : Observable<Graph>{
    return this.http.get<Graph>(this.baseUrl);
  }
}
