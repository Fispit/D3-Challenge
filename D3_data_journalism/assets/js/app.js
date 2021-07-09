
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
  
    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
  
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 50
    };
    
    var startxaxis="income";
    var startyaxis="obesity";   

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;


  var svg = d3
    .select("#row")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);


  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    function xScale(statedata, chosenXAxis) {
        // create scales
        var xLinearScale = d3.scaleLinear()
          .domain([d3.min(statedata, d => d[startxaxis]) * 0.8,
            d3.max(statedata, d => d[startxaxis]) * 1.2
          ])
          .range([0, width]);
      
        return xLinearScale;
      
      }
      
      function yScale(statedata, startyaxis) {
        // create scales
        var yLinearScale = d3.scaleLinear()
          .domain([d3.min(statedata, d => d[startyaxis]) * 0.8,
            d3.max(statedata, d => d[startyaxis]) * 1.2
          ])
          .range([0, width]);
      
        return yLinearScale;
      
      }
      

    d3.csv("assets/data/data.csv").then(function(statedata) {

        var xLinearScale = xScale(statedata, startxaxis);
        var yLinearScale = yScale(statedata, startyaxis);
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        var xAxis = chartGroup.append("g")
                    .classed("x-axis", true)
                    .attr("transform", `translate(0, ${height})`)
                    .call(bottomAxis);
        
        chartGroup.append("g")
                .call(leftAxis);
      
      
      
      
      
      
    
    
    
    
    });


}


makeResponsive();

d3.select(window).on("resize", makeResponsive);