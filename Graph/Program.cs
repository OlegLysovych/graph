using System;
using System.Linq;
using Graph.ChinesePostman;
using Graph.Salesman_problem;

namespace Graph
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            var graph = Initializing.CreateGraph(@"../Graph/_SalesmanProblem.txt");
            var matrix = Initializing.CreateMatrix(@"../Graph/_SalesmanProblem.txt");

            BnB_matrix brunchAndBound = new BnB_matrix();

            var edges = BnB_matrix.BranchAndBound(matrix);
            var graphToReturn = (Graph)graph.Clone();
            foreach (var item in edges)
            {
                if (graphToReturn.Edges.Any(x => x.Source == item.Source && x.Destination == item.Destination))
                {
                    continue;
                }
                else if (graphToReturn.Edges.Any(x => x.Destination == item.Source && x.Source == item.Destination))
                {
                    int temp = 0;
                    temp = item.Source;
                    item.Source = item.Destination;
                    item.Destination = temp;
                }
            }
            graphToReturn.EdgesCount = edges.Length;

            graphToReturn.Edges = edges;
        }
    }
}
