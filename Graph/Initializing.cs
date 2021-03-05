using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Graph
{
    public static class Initializing
    {
        public static Graph CreateGraph(string path)
        {
            Graph graph = new Graph();
            List<Edge> edges = new List<Edge>();
            List<Node> nodes = new List<Node>();

            string input = File.ReadAllText(path);

            int arrDimension = Int32.Parse(input.Split("\n").ElementAt(0));
            graph.VerticesCount = arrDimension;

            input = input.Substring(2);
            int i = 0, j = 0;

            foreach (var row in input.Split('\n'))
            {
                j = 0;
                foreach (var col in row.Trim().Split(' '))
                {
                    var value = int.Parse(col.Trim());

                    if (value != 0)
                    {
                        if (!edges.Exists(x => x.Source == j && x.Destination == i))
                        {
                            var edge = new Edge
                            {
                                Source = i,
                                Destination = j,
                                Weight = int.Parse(col.Trim())
                            };

                            edges.Add(edge);
                            
                            if (nodes.Exists(x => x.Id == i))
                                nodes.First(x => x.Id == i).Rank++;
                            else
                                nodes.Add(new Node { Id = i, Rank = 1 });

                            if (nodes.Exists(x => x.Id == j))
                                nodes.First(x => x.Id == j).Rank++;
                            else
                                nodes.Add(new Node { Id = j, Rank = 1 });

                        }

                    }
                    j++;
                }
                i++;
            }

            graph.EdgesCount = edges.Count;
            graph.Edges = edges.ToArray();
            graph.Nodes = nodes.ToArray();

            return graph;
        }
    }
}