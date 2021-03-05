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

@NgModule({
  declarations: [AppComponent, GraphComponent, KruskalComponent, ChinesePostmanComponent, NavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // NgxGraphModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [GraphService, KruskalResolver, PostmanResolver],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
