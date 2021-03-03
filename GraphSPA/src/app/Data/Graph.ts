import { Edge } from './Edge';
export interface Graph {
  verticesCount: number;
  edgesCount: number;
  edges: Edge[];
}
