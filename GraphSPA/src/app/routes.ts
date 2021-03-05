import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ChinesePostmanComponent } from "./Graph/ChinesePostman/ChinesePostman.component";
import { GraphComponent } from "./Graph/Graph.component";
import { KruskalComponent } from "./Graph/Kruskal/Kruskal.component";
import { NavComponent } from "./Graph/nav/nav.component";
import { KruskalResolver } from "./_resolver/kruskal.resolver";
import { PostmanResolver } from "./_resolver/postman.resolver";

export const appRoutes:Routes = [
    {path: '', component: GraphComponent},
    {
        path: '',
        children: [
            {path: 'Kruskal', component: KruskalComponent, resolve: {kruskal: KruskalResolver}},
            {path: 'ChinesePostman', component: ChinesePostmanComponent, resolve: {postman: PostmanResolver}}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'},
];