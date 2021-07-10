// The code for the chart is wrapped inside a function that
// automatically resizes the chart
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
  var svgWidth = window.innerWidth-200;
  var svgHeight = window.innerHeight-500;

  
    var margin = {
      top: 50,
      bottom: 100,
      right: 50,
      left: 100
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
                    .attr("transform", `translate(0, ${height})`)
                    .call(bottomAxis);
        
        var yAxis = chartGroup.append("g")
                    .classed("y-axis", true)
                    .attr("transform", `translate(0, 0)`)
                    .call(leftAxis);
      
        var circlesGroup = chartGroup.selectAll("circle")
                .data(statedata)
                .enter()
                .append("circle")
                .attr("cx", d => xLinearScale(d.income))
                .attr("cy", d => yLinearScale(d.obesity))
                .attr("r", "17")
                .attr("fill", "red")
                .attr("opacity", "1")
                .attr("id","cirledots");
          
            chartGroup.append("g").selectAll("text")
                .data(statedata)
                .enter()
                .append("text")
                .attr("x", d => xLinearScale(d.income)-12)
                .attr("y", d => yLinearScale(d.obesity)+7)
                .attr("id","circelabels")
                .text(d=>d.abbr);    
                
            var labelsGroupx = chartGroup.append("g")
                .attr("transform", `translate(${width / 2}, ${height + 20})`);
                      
                    
            var albumsLabel = labelsGroupx.append("text")
                .attr("x", 0)
                .attr("y", 40)
                .attr("value", "num_albums") // value to grab for event listener
                .classed("inactive", true)
                .text("Income");


            var labelsGroupy = chartGroup.append("g")
                .attr("transform", `translate(${0-margin.left}, ${height / 2})`);
                      
    

            var albumsLabel = labelsGroupy.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0)
                .attr("x", 0 )
                .attr("dy", "1em")
                .classed("inactive", true)
                .text("Obesity");

  // append y axis


    });

  }


// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
