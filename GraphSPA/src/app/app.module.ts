import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
// import { NgxGraphModule } from '@swimlane/ngx-graph'
import { FormsModule } from '@angular/forms'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './Graph/Graph.component';
import { from } from 'rxjs';
import { GraphService } from './_services/graph.service';
import { GraphResolver } from './_resolver/graph.resolver';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

@NgModule({
  declarations: [	
    AppComponent,
      GraphComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // NgxGraphModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [
    GraphService,
    GraphResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
