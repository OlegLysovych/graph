import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { GraphComponent } from "./Graph/Graph.component";
import { GraphResolver } from "./_resolver/graph.resolver";

export const appRoutes:Routes = [
    {path: '', component: GraphComponent, resolve: {graph: GraphResolver}},
];