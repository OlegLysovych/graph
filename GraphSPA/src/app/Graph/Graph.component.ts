import { HttpClient } from '@angular/common/http';
import { Component, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import greuler from 'greuler';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Edge } from '../Data/Edge';
import { Graph } from '../Data/Graph';
import { GraphService } from '../_services/graph.service';

@Component({
  selector: 'app-Graph',
  templateUrl: './Graph.component.html',
  styleUrls: ['./Graph.component.css'],
})
export class GraphComponent implements OnInit {
  graphArr: Graph[];
  graph: Graph;
  graphStarted: Graph;
  edgess: Edge[];
  solvedNodesToShow: any[] = [];
  solvedEdgesToShow: any[] = [];
  startedNodesToShow: any[] = [];
  startedEdgesToShow: any[] = [];

  constructor(
    private graphService: GraphService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadGraph();
    this.startedEdgesToShow = this.computeEdgesForDisplay(this.graphStarted);
    this.startedNodesToShow = this.computeNodesForDisplay(this.graphStarted);

    this.solvedEdgesToShow = this.computeEdgesForDisplay(this.graph);
    this.solvedNodesToShow = this.computeNodesForDisplay(this.graph);
  }

  startedClick(event: Event) {
    console.log(this.graph);
    const instance = greuler({
      target: '#started',
      data: {
        nodes: this.startedNodesToShow,
        edges: this.startedEdgesToShow,
      },
    }).update();
  }
  solvedClick(event: Event) {
    console.log(this.graph);
    const instance = greuler({
      target: '#solved',
      data: {
        nodes: this.solvedNodesToShow,
        edges: this.solvedEdgesToShow,
      },
    }).update();
  }

  loadGraph() {
    this.route.data.subscribe((data) => {
      this.graphArr = data['graph'];
      this.graphStarted = this.graphArr[0];
      this.graph = this.graphArr[1];
    });
  }

  graphSeparation(graphToSeparate: Graph[]){
    for (let i = 0; i < this.graphArr.length; i++) {

    }
  }

  computeNodesForDisplay(graphToOper: Graph) {
    let nodesToReturn: any[] = [];
    for (let i = 0; i < graphToOper?.verticesCount; i++) {
      let newNode = {
        id: i,
      };
      nodesToReturn.push(newNode);
    }
    return nodesToReturn;
  }
  computeEdgesForDisplay(graphToOper: Graph) {
    let edgesToReturn: any[] = [];
    for (let i = 0; i < graphToOper?.edgesCount; i++) {
      let newNode = {
        source: graphToOper.edges[i].source,
        target: graphToOper.edges[i].destination,
        displayWeight: graphToOper.edges[i].weight,
      };
      edgesToReturn.push(newNode);
    }
    return edgesToReturn;
  }
}
