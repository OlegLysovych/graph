using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Graph.ChinesePostman;
using Graph.Flow;
using Graph.Salesman_problem;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Graph.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GraphController : ControllerBase
    {
        private readonly ILogger<GraphController> _logger;

        public GraphController(ILogger<GraphController> logger)
        {
            _logger = logger;
        }

        // [HttpGet]
        // public IEnumerable<WeatherForecast> Get()
        // {
        //     // var graph = Initializing.CreateGraph();
        //     // return KruskalAlgorithm.KruskalSolve(graph);
        //     var rng = new Random();
        //     return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //     {
        //         Date = DateTime.Now.AddDays(index),
        //         TemperatureC = rng.Next(-20, 55),
        //         Summary = Summaries[rng.Next(Summaries.Length)]
        //     })
        //     .ToArray();
        // }
        [HttpGet("Kruskal")]
        public async Task<IActionResult> GetKruskal()
        {
            // var graph = Initializing.CreateGraph(@"../Graph/_Kruskal.txt");

            var matrix = new int[8, 8] {
                {0, 3, 0, 0, 0, 34, 0, 80},
                {3, 0, 0, 1, 0, 0, 0, 68},
                {0, 0, 0, 0, 23, 0, 12, 0},
                {0, 1, 0, 0, 53, 0, 0, 39},
                {0, 0, 23, 53, 0, 0, 68, 14},
                {34, 0, 0, 0, 0, 0, 0, 25},
                {0, 0, 12, 0, 68, 0, 0, 99},
                {80, 68, 0, 39, 14, 25, 99, 0 },
            };

            var graph = Initializing.CreateGraph(matrix);

            var graphToReturn = KruskalAlgorithm.KruskalSolve(graph);
            List<Graph> listGraph = new List<Graph>
            {
                graph,
                graphToReturn
            };
            return Ok(listGraph);
        }
        [HttpGet("Salesman")]
        public async Task<IActionResult> GetSalesman()
        {
            var graph = Initializing.CreateGraph(@"../Graph/_SalesmanProblem.txt");
            var matrix = Initializing.CreateMatrix(@"../Graph/_SalesmanProblem.txt");

            BnB_matrix brunchAndBound = new BnB_matrix();

            var edges = brunchAndBound.BranchAndBound(matrix);
            var graphToReturn = (Graph)graph.Clone();
            graphToReturn.EdgesCount = edges.Length;

            graphToReturn.Edges = edges;

            List<Graph> listGraph = new List<Graph>
            {
                graph,
                graphToReturn
            };
            return Ok(listGraph);
        }
        [HttpGet("ChinesePostman")]
        public async Task<IActionResult> GetChinesePostman()
        {
            // var graph = Initializing.CreateGraph(@"../Graph/_ChinesePostman.txt");

            var matrix = new int[8, 8] {
                {0, 0, 0, 0, 86, 94, 51, 82},
                {0, 0, 81, 0, 20, 87, 0, 0},
                {0, 81, 0, 83, 41, 0, 0, 0},
                {0, 0, 83, 0, 8, 0, 0, 0 },
                {86, 20, 41, 8, 0, 40, 0, 54},
                {94, 87, 0, 0, 40, 0, 89, 0},
                {51, 0, 0, 0, 0, 89, 0, 18},
                {82, 0, 0, 0, 54, 0, 18, 0},
            };

            var graph = Initializing.CreateGraph(matrix);

            Graph newGraph = new Graph();
            if (!ChinesePostman.ChinesePostman.IsEvenDegree(graph.Nodes))
            {
                var oddNodes = OddFinder.FindOddNodes(graph.Nodes);
                newGraph = ChinesePostman.ChinesePostman.PairingOddVertices(graph, oddNodes);
            }
            var eulerianPath = ChinesePostman.ChinesePostman.FindEulerianPath(newGraph);
            newGraph.Nodes = eulerianPath.ToArray();
            List<Graph> fullResponse = new List<Graph> { graph, newGraph };
            return Ok(fullResponse);
        }

        [HttpGet("FlowByFF")]
        public async Task<IActionResult> GetMaxFlowByFF()
        {
            // var graph = Initializing.CreateGraph(@"../Graph/_Flow.txt");
                        var matrix = new int[8, 8] {
                {0, 20, 20, 40, 0, 0, 0, 0},
                {0, 0, 10, 0, 10, 0, 0, 0},
                {0, 0, 0, 20, 20, 0, 0, 0},
                {0, 0, 0, 0, 0, 20, 20, 0},
                {0, 0, 0, 0, 0, 0, 0, 30},
                {0, 0, 10, 0, 20, 0, 0, 20},
                {0, 0, 0, 0, 0, 10, 0, 20},
                {0, 0, 0, 0, 0, 0, 0, 0},
            };

            var graph = Initializing.CreateGraph(matrix); //Can initialize from file to matrix, from file to graph, from matrix to graph and so

            FlowCalc flowCalc = new FlowCalc(graph);
            var flow = flowCalc.FindMaximumFlow();

            var newGraph = (Graph)graph.Clone();

            foreach (var item in flow)
            {
                newGraph.Edges.Where(x => x.Source == item.Edge.Source && x.Destination == item.Edge.Destination && x.Weight == item.Edge.Weight).Select(x => { x.Weight = item.Flow; return x; }).ToArray();
            }
            // (Graph graph, List<FlowModel> flow) fullResponse;

            List<Graph> fullResponse = new List<Graph>();
            // fullResponse.graph = graph;
            // fullResponse.flow = flow;

            fullResponse.Add(graph);
            fullResponse.Add(newGraph);
            return Ok(fullResponse);
        }
    }
}