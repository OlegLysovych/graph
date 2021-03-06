using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Graph.ChinesePostman;
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
            var graph = Initializing.CreateGraph(@"../Graph/_Kruskal.txt");
            var graphToReturn = KruskalAlgorithm.KruskalSolve(graph);
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
            var graph = Initializing.CreateGraph(@"../Graph/_ChinesePostman.txt");

            Graph newGraph = new Graph();
            if (!ChinesePostman.ChinesePostman.IsEvenDegree(graph.Nodes))
            {
                var oddNodes = OddFinder.FindOddNodes(graph.Nodes);
                newGraph = ChinesePostman.ChinesePostman.PairingOddVertices(graph, oddNodes);
            }
            var eulerianPath = ChinesePostman.ChinesePostman.FindEulerianPath(newGraph);
            newGraph.Nodes = eulerianPath.ToArray();
            List<Graph> fullResponse = new List<Graph>{graph, newGraph};
            return Ok(fullResponse);
        }
    }
}