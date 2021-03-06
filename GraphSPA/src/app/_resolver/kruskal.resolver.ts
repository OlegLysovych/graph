import { Injectable } from "@angular/core";
import { Graph } from '../Data/Graph';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { GraphService } from "../_services/graph.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()

export class KruskalResolver implements Resolve<Graph>{
    constructor(private graphService: GraphService, private router: Router){}

    resolve(route: ActivatedRouteSnapshot) : Observable<Graph> {
        return this.graphService.getGraphByKruskal().pipe(
            catchError(error => {
                console.log("proplem");
                this.router.navigate(['']);
                return of;
            })
        );
    }
}