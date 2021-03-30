import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ChinesePostmanComponent } from "./Graph/ChinesePostman/ChinesePostman.component";
import { FlowFFComponent } from "./Graph/FlowFF/FlowFF.component";
import { GraphComponent } from "./Graph/Graph.component";
import { KruskalComponent } from "./Graph/Kruskal/Kruskal.component";
import { NavComponent } from "./Graph/nav/nav.component";
import { SalesmanComponent } from "./Graph/Salesman/Salesman.component";
import { FlowResolver } from "./_resolver/flow.resolver";
import { KruskalResolver } from "./_resolver/kruskal.resolver";
import { PostmanResolver } from "./_resolver/postman.resolver";
import { SalesmanResolver } from "./_resolver/salesman.resolver";

export const appRoutes:Routes = [
    {path: '', component: GraphComponent},
    {
        path: '',
        children: [
            {path: 'Kruskal', component: KruskalComponent, resolve: {kruskal: KruskalResolver}},
            {path: 'ChinesePostman', component: ChinesePostmanComponent, resolve: {postman: PostmanResolver}},
            {path: 'Salesman', component: SalesmanComponent, resolve: {salesman: SalesmanResolver}},
            {path: 'FlowFF', component: FlowFFComponent, resolve: {flow: FlowResolver}},
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'},
];