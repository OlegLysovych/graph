import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Edge } from 'src/app/Data/Edge';
import { Graph } from 'src/app/Data/Graph';
import { GraphService } from 'src/app/_services/graph.service';
import greuler from 'greuler';


@Component({
  selector: 'app-Salesman',
  templateUrl: './Salesman.component.html',
  styleUrls: ['./Salesman.component.css']
})
export class SalesmanComponent implements OnInit {
  graphArr: Graph[];
  graph: Graph;
  graphStarted: Graph;
  edgess: Edge[];
  solvedNodesToShow: any[] = [];
  solvedEdgesToShow: any[] = [];
  startedNodesToShow: any[] = [];
  startedEdgesToShow: any[] = [];

  instanceResolved: any;
  instanceStarted: any;
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
    this.instanceStarted = greuler({
      target: '#started',
      data: {
        linkDistance: 150,
        nodes: this.startedNodesToShow,
        edges: this.startedEdgesToShow,
      },
    }).update();
  }
  
  solvedClick(event: Event) {
    console.log(this.graph);
    this.instanceResolved = greuler({
      target: '#solved',
      data: {
        linkDistance: 150,
        nodes: this.solvedNodesToShow,
        edges: this.solvedEdgesToShow,
      },
    }).update();
  }

  showPathClick(event: Event) {
    for (let index = 0; index < this.graph.edges.length; index++) {
      const element = this.graph.edges[index];
      setTimeout(() => {
        this.instanceStarted.selector.traverseAllEdgesBetween({
          source: element.source, 
          target: element.destination,
        });
        // this.instanceStarted.selector.highlightEdge(element);
      }, 1000 * index);
      this.instanceStarted.update({ skipLayout: true });
    }
  }

  loadGraph() {
    this.route.data.subscribe((data) => {
      this.graphArr = data['salesman'];
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
        r: 15,
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
