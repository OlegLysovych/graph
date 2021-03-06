import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Edge } from 'src/app/Data/Edge';
import { Graph } from 'src/app/Data/Graph';
import greuler from 'greuler';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-ChinesePostman',
  templateUrl: './ChinesePostman.component.html',
  styleUrls: ['./ChinesePostman.component.css'],
})
export class ChinesePostmanComponent implements OnInit {
  graphArr: Graph[];
  graph: Graph;
  graphStarted: Graph;
  edgess: Edge[];
  solvedNodesToShow: any[] = [];
  solvedEdgesToShow: any[] = [];
  startedNodesToShow: any[] = [];
  startedEdgesToShow: any[] = [];

  instanceOld: any;
  instanceResolved: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadGraph();
    this.startedEdgesToShow = this.computeEdgesForDisplay(this.graphStarted);
    this.startedNodesToShow = this.computeNodesForDisplay(this.graphStarted);

    this.solvedEdgesToShow = this.computeEdgesForDisplay(this.graph);
    this.solvedNodesToShow = this.computeNodesForDisplay(this.graph);
  }

  loadGraph() {
    this.route.data.subscribe((data) => {
      this.graphArr = data['postman'];
      this.graphStarted = this.graphArr[0];
      this.graph = this.graphArr[1];
    });
  }

  startedClick(event: Event) {
    console.log(this.graph);
    this.instanceOld = greuler({
      target: '#started',
      data: {
        linkDistance: 200,
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
        linkDistance: 180,
        nodes: this.solvedNodesToShow,
        edges: this.solvedEdgesToShow,
      },
    }).update();
  }
  showPathByArrowClick(event: Event) {
    for (let index = 0; index < this.instanceResolved.graph.edges.length; index++) {
      const edge = this.instanceResolved.graph.edges[index]
      const update = this.instanceResolved.graph.getEdge({id: edge.id})
      update.directed = !update.directed;
      this.instanceResolved.update({ skipLayout: true })
    }
  }
  showPathClick(event: Event) {
    for (let index = 0; index < this.graph.nodes.length; index++) {
      const element = this.graph.nodes[index];
      // this.instanceResolved.selector.traverseOutgoingEdges({ id: this.graph.nodes[index].id });
      // this.instanceResolved.selector.traverseIncomingEdges({ id:  this.graph.nodes[index + 1].id});
      setTimeout(() => {
        // this.instanceResolved.selector.highlightEdge({
        //   edge: this.instanceResolved.graph.getEdge({ source: element.id, target: this.graph.nodes[index + 1].id}),
        // });
        this.instanceResolved.selector.traverseAllEdgesBetween({
          source: element.id, 
          target: this.graph.nodes[index + 1].id,
        });
        // this.instanceResolved.selector.traverseIncomingEdges(
        //   {
        //     id: this.graph.nodes[index + 1].id,
        //   },
        //   { keepStroke: false }
        // );
      }, 1000 * index);
      this.instanceResolved.update({ skipLayout: true });
    }
  }
  traverse(fromId: number, toId: number) {
    // this.instanceResolved.selector.traverseOutgoingEdges({ id: this.graph.nodes[index].id });
    // this.instanceResolved.selector.traverseIncomingEdges({ id:  this.graph.nodes[index + 1].id});
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
