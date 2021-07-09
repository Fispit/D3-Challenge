
    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
  
    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = 2000;
    var svgHeight = 900;
  
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
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);


  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    function xScale(statedata, chosenXAxis) {
        // create scales
        var xLinearScale = d3.scaleLinear()
          .domain([d3.min(statedata, d => d[startxaxis]),
            d3.max(statedata, d => d[startxaxis])
          ])
          .range([0, width]);
      
        return xLinearScale;
      
      }
      
      function yScale(statedata, startyaxis) {
        // create scales
        var yLinearScale = d3.scaleLinear()
          .domain([d3.min(statedata, d => d[startyaxis]),
            d3.max(statedata, d => d[startyaxis])
          ])
          .range([0, height]);
      
        return yLinearScale;
      
      }
      

    d3.csv("assets/data/data.csv").then(function(statedata) {

        var xLinearScale = xScale(statedata, startxaxis);
        var yLinearScale = yScale(statedata, startyaxis);
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        var xAxis = chartGroup.append("g")
                    .classed("x-axis", true)
                    .attr("transform", `translate(0, ${height}`)
                    .call(bottomAxis);
        
        var yAxis = chartGroup.append("g")
                    .classed("y-axis", true)
                    .call(leftAxis);
      
        var circlesGroup = chartGroup.selectAll("circle")
                .data(statedata)
                .enter()
                .append("circle")
                .attr("cx", d => xLinearScale(d.income))
                .attr("cy", d => yLinearScale(d.obesity))
                .attr("r", "15")
                .attr("fill", "red")
                .attr("opacity", "1")
          circlesGroup.append("text",)        
      
      
      
      
      
    
    
    
    
    });
