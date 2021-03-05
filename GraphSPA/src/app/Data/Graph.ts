import { Edge } from './Edge';
import { Node } from './Node';
export interface Graph {
  verticesCount: number;
  edgesCount: number;
  edges: Edge[];
  nodes: Node[];
}
