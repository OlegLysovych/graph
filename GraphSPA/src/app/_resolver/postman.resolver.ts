import { Injectable } from "@angular/core";
import { Graph } from '../Data/Graph';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { GraphService } from "../_services/graph.service";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()

export class PostmanResolver implements Resolve<Graph>{
    constructor(private graphService: GraphService, private router: Router){}

    resolve(route: ActivatedRouteSnapshot) : Observable<Graph> {
        return this.graphService.getGraphByPostman().pipe(
            catchError(error => {
                console.log("proplem");
                this.router.navigate(['']);
                return of;
            })
        );
    }
}