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

    function xScale(statedata, startxaxis) {
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
                      
                    
            var incomelabel = labelsGroupx.append("text")
                .attr("x", 0)
                .attr("y", 40)
                .attr("value", "income") // value to grab for event listener
                .classed("inactive", false)
                .classed("active",true)
                .text("Income (USD)");
                
            var healthcarelabel = labelsGroupx.append("text")
                .attr("x", 0)
                .attr("y", 20)
                .attr("value", "healthcare") // value to grab for event listener
                .classed("inactive", true)
                .text("Healthcare (%)");


            var labelsGroupy = chartGroup.append("g")
                .attr("transform", `translate(${0-margin.left}, ${height / 2})`);
                      
    

            var obesitylabel = labelsGroupy.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0)
                .attr("x", 0 )
                .attr("value", "obesity")
                .attr("dy", "1em")
                .classed("active", true)
                .text("Obesity (%)");

            var smokinglabel = labelsGroupy.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0+30)
                .attr("x", 0 )
                .attr("value", "smokes")
                .attr("dy", "1em")
                .classed("inactive", true)
                .text("Smoking (%)");


            labelsGroupx.selectAll("text").on("click", function() {
                  // get value of selection
                  var value = d3.select(this).attr("value");
                  if (value !== startxaxis) {
              
                    // replaces chosenXAxis with value
                    startxaxis = value;

                    xLinearScale = xScale(statedata, startxaxis);
              
                    // updates x axis with transition
                    xAxis = renderAxes(xLinearScale, xAxis);
              
                    // updates circles with new x values
                    circlesGroup = renderCircles(circlesGroup, xLinearScale, startxaxis);
              
              
                    // changes classes to change bold text
                    if (startxaxis == "income") {
                      incomelabel
                        .classed("active", true)
                        .classed("inactive", false);
                        healthcarelabel
                        .classed("active", false)
                        .classed("inactive", true);
                    }
                    else {
                      incomelabel
                        .classed("active", false)
                        .classed("inactive", true);
                      healthcarelabel
                        .classed("active", true)
                        .classed("inactive", false);
                    }
                  }
                });


  

    });

  }
  
  

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);





function renderxAxes(startxaxis, xAxis) {
      var bottomAxis = d3.axisBottom(startxaxis);
    
      xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    
      return xAxis;
}
    
    // function used for updating circles group with a transition to
    // new circles
function renderCircles(circlesGroup, newXScale, startxaxis) {
    
      circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[startxaxis]));
    
      return circlesGroup;
}


