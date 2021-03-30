import { Edge } from "./Edge";

export interface FlowModel {
    edge: Edge;
    visited: boolean;
    full: boolean;
    flow: number;
}
