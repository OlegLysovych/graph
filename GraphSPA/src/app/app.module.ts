import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// import { NgxGraphModule } from '@swimlane/ngx-graph'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './Graph/Graph.component';
import { from } from 'rxjs';
import { GraphService } from './_services/graph.service';
import { KruskalResolver } from './_resolver/kruskal.resolver';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { PostmanResolver } from './_resolver/postman.resolver';
import { KruskalComponent } from './Graph/Kruskal/Kruskal.component';
import { ChinesePostmanComponent } from './Graph/ChinesePostman/ChinesePostman.component';
import { NavComponent } from './Graph/nav/nav.component';
import { SalesmanResolver } from './_resolver/salesman.resolver';
import { SalesmanComponent } from './Graph/Salesman/Salesman.component';
import { FlowFFComponent } from './Graph/FlowFF/FlowFF.component';
import { FlowResolver } from './_resolver/flow.resolver';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    KruskalComponent,
    ChinesePostmanComponent,
    NavComponent,
    SalesmanComponent,
    FlowFFComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // NgxGraphModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [GraphService, KruskalResolver, PostmanResolver, SalesmanResolver, FlowResolver],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
