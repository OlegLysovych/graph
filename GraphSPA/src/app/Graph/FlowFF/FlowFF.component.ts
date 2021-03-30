import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Edge } from 'src/app/Data/Edge';
import { Graph } from 'src/app/Data/Graph';
import { GraphService } from 'src/app/_services/graph.service';
import greuler from 'greuler';

@Component({
  selector: 'app-FlowFF',
  templateUrl: './FlowFF.component.html',
  styleUrls: ['./FlowFF.component.css'],
})
export class FlowFFComponent implements OnInit {
  graphArr: Graph[];
  graph: Graph;
  graphStarted: Graph;
  edgess: Edge[];
  solvedNodesToShow: any[] = [];
  solvedEdgesToShow: any[] = [];
  startedNodesToShow: any[] = [];
  startedEdgesToShow: any[] = [];

  flowCost: number;

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
        linkDistance: 130,
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
        linkDistance: 130,
        nodes: this.solvedNodesToShow,
        edges: this.solvedEdgesToShow,
      },
    }).update();
    this.calculateFlow(event);
  }

  showPathClick(event: Event) {
    for (let index = 0; index < this.graph.edges.length; index++) {
      const element = this.graph.edges[index];
      if (element.weight != 0) {
        setTimeout(() => {
          this.instanceResolved.selector.traverseAllEdgesBetween({
            source: element.source,
            target: element.destination,
          });
          // this.instanceStarted.selector.highlightEdge(element);
        }, 1000 * index);
        this.instanceResolved.update({ skipLayout: true });
      }
    }
  }

  calculateFlow(event: Event) {
    this.flowCost = this.graph.edges
      .filter(
        (x) =>
          x.destination ==
          this.graph.nodes[this.graph.nodes.length-1].id
      )
      .reduce((acc, cur) => acc + cur.weight, 0);
    // for (let i = 0; i < this.graph.edges.length; i++) {
    //   if (this.graph.edges[i].destination == this.nod)
    //   this.flowCost += 
    // }

  }

  loadGraph() {
    this.route.data.subscribe((data) => {
      this.graphArr = data['flow'];
      this.graphStarted = this.graphArr[0];
      this.graph = this.graphArr[1];
    });
  }

  graphSeparation(graphToSeparate: Graph[]) {
    for (let i = 0; i < this.graphArr.length; i++) {}
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
