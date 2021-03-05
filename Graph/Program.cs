using System;
using Graph.ChinesePostman;

namespace Graph
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            var graph = Initializing.CreateGraph("_ChinesePostman.txt");

            Graph newGraph = new Graph();
            if (!ChinesePostman.ChinesePostman.IsEvenDegree(graph.Nodes))
            {
                var oddNodes = OddFinder.FindOddNodes(graph.Nodes);
                newGraph = ChinesePostman.ChinesePostman.PairingOddVertices(graph, oddNodes);
            }
            var eulerianPath = ChinesePostman.ChinesePostman.FindEulerianPath(newGraph);
        }
    }
}
