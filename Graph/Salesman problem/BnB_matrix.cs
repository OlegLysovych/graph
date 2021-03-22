using System;
using System.Collections.Generic;
using System.Linq;

namespace Graph.Salesman_problem
{
    public class BnB_matrix
    {
        // public static Graph _graph;
        public static List<Edge> _edges;
        public static int[,] _matrix;

        public static int minCost;

        public static int _cost;

        public BnB_matrix()
        {
            _edges = new List<Edge>();
            minCost = int.MaxValue;
            _cost = default;
        }

        public static Edge[] BranchAndBound(int[,] matrix)
        {
            bool noValues = true;
            if (_matrix == null)
            {
                _matrix = (int[,])matrix.Clone();

            }
            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                var minForRow = FindMinWeightInRow(matrix, i);
                if (minForRow != int.MaxValue)
                {
                    matrix = SubstractFromRow(matrix, i, minForRow);
                    _cost += minForRow;
                    noValues = false;
                }
            }
            for (int i = 0; i < matrix.GetLength(1); i++)
            {
                var minForCol = FindMinWeightInCol(matrix, i);
                if (minForCol != int.MaxValue)
                {
                    matrix = SubstractFromCol(matrix, i, minForCol);
                    _cost += minForCol;
                    noValues = false;
                }
            }


            if (!noValues)
            {
                matrix = RemoveMaxCoef(matrix);
            }
            else
            {
                _cost = _edges.Sum(x => x.Weight);
                return _edges.ToArray();
            }

            if (_cost < minCost)
                BranchAndBound(matrix);

            return _edges.ToArray();
        }

        private static bool IsEmpty(int[,] matrix)
        {
            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                for (int j = 0; j < matrix.GetLength(1); j++)
                {
                    if (matrix[i, j] > 0)
                        return false;
                }
            }
            return true;
        }
        // private int[,] Substract(int [,] matrix)
        // {

        // }
        private static int[,] RemoveMaxCoef(int[,] matrix)
        {
            int maxCoefForRow = default;
            int maxCoefForCol = default;
            int maxCoef = int.MinValue;
            List<(int row, int col, int maxCof)> Fine = new List<(int row, int col, int maxCof)>();
            //Вираховується штраф за невикористання кожного нульового елементу приведеної мтариці
            //Штарф за невикористання індексу (i,j) в матриці означає, що це ребро не включається в маршрут, а знач мінімальна вартість
            //"невикористання" цього ребра рівна сумі мінімальних елментів в стріці i & column j
            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                for (int j = 0; j < matrix.GetLength(1); j++)
                {
                    int coef = default;
                    if (matrix[i, j] == 0)//шукаю всі нульові елементи в новій приведеній матриці
                    {
                        coef = CalculateCoeficient(matrix, i, j);//для кожного нуля рахую штраф за невикористання
                        if (coef > maxCoef)//обираю найбільший штраф
                        {
                            maxCoefForRow = i;
                            maxCoefForCol = j;
                            maxCoef = coef;
                            if (Fine.Exists(x => x.row == maxCoefForRow && x.col == maxCoefForCol))
                            {
                                var tuple = Fine.First(x => x.row == maxCoefForRow && x.col == maxCoefForCol);
                                tuple.maxCof = coef;
                                var index = Fine.FindIndex(x => x.row == maxCoefForRow && x.col == maxCoefForCol);
                                Fine[index] = tuple;
                            }
                            else
                                Fine.Add((i, j, coef));
                        }
                    }
                }

            }

            matrix[maxCoefForRow, maxCoefForCol] = -1;
            matrix[maxCoefForCol, maxCoefForRow] = -1;

            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                matrix[maxCoefForRow, i] = -1;
            }
            for (int i = 0; i < matrix.GetLength(1); i++)
            {
                matrix[i, maxCoefForCol] = -1;
            }

            _edges.Add(new Edge()
            {
                Source = maxCoefForRow,
                Destination = maxCoefForCol,
                Weight = _matrix[maxCoefForRow, maxCoefForCol]
            });


            return matrix;
        }

        private static int CalculateCoeficient(int[,] matrix, int source, int destination)
        {
            int minForRow = int.MaxValue;
            int minForCol = int.MaxValue;

            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                if (i != source && matrix[i, destination] != 0 && matrix[i, destination] != -1 && matrix[i, destination] < minForCol)
                {
                    minForCol = matrix[i, destination];
                }
            }

            for (int i = 0; i < matrix.GetLength(1); i++)
            {
                if (i != destination && matrix[source, i] != 0 && matrix[source, i] != -1 && matrix[source, i] < minForRow)
                {
                    minForRow = matrix[source, i];
                }
            }

            if (minForCol == int.MaxValue)
            {
                minForCol = 0;
            }
            if (minForRow == int.MaxValue)
            {
                minForRow = 0;
            }

            return minForCol + minForRow;
        }

        private static int[,] SubstractFromRow(int[,] matrix, int row, int minForRow)
        {
            for (int i = 0; i < matrix.GetLength(1); i++)
            {
                if (matrix[row, i] != -1)
                    matrix[row, i] -= minForRow;
            }
            return matrix;
        }
        private static int[,] SubstractFromCol(int[,] matrix, int col, int minForCol)
        {
            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                if (matrix[i, col] != -1)
                    matrix[i, col] -= minForCol;
            }
            return matrix;
        }

        private static int FindMinWeightInRow(int[,] matrix, int row)
        {
            var min = int.MaxValue;
            for (int i = 0; i < matrix.GetLength(1); i++)
            {
                if (matrix[row, i] != -1 && matrix[row, i] < min)
                    min = matrix[row, i];
            }
            return min;
        }
        private static int FindMinWeightInCol(int[,] matrix, int col)
        {
            var min = int.MaxValue;
            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                if (matrix[i, col] != -1 && matrix[i, col] < min)
                    min = matrix[i, col];
            }
            return min;
        }
    }
}