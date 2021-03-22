import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Graph } from '../Data/Graph';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  baseUrl = 'http://localhost:5000/graph';

constructor(private http: HttpClient) { }

  getGraphByKruskal() : Observable<Graph>{
    return this.http.get<Graph>(this.baseUrl + "/Kruskal");
  }
  
  getGraphByPostman() : Observable<Graph>{
    return this.http.get<Graph>(this.baseUrl + "/ChinesePostman");
  }

  getGraphBySalesman() : Observable<Graph>{
    return this.http.get<Graph>(this.baseUrl + "/Salesman");
  }
}
