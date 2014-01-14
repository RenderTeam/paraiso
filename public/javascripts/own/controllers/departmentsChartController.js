function departmentsChartController ( scope, departments, employment, employmentTree ) {
  var chart = { 
    name: '',
    children: []
  };
  departments.getDepartments().
    success( function ( data ) {
      data.forEach( function ( element, index, array ) {
        if ( index + 1 < array.length ) {
          createDepartment( element.name, chart );
        } else {
          createDepartment( element.name, chart, function ( finalChart ) {
            console.log( finalChart );

            var w = 1100,
                h = 700,
                r = 500,
                x = d3.scale.linear().range([0, r]),
                y = d3.scale.linear().range([0, r]),
                node,
                root;

            var pack = d3.layout.pack()
                .size([r, r])
                .value(function(d) { return d.size; })

            var vis = d3.select("#chart").insert("svg:svg", "h2")
                .attr("width", w)
                .attr("height", h)
              .append("svg:g")
                .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");

            d3.json("/json/area.json", function(data) {
              node = root = finalChart;
              console.log(finalChart);

              var nodes = pack.nodes(finalChart);

              vis.selectAll("circle")
                  .data(nodes)
                .enter().append("svg:circle")
                  .attr("class", function(d) { return d.children ? "parent" : "child"; })
                  .attr("cx", function(d) { return d.x; })
                  .attr("cy", function(d) { return d.y; })
                  .attr("r", function(d) { return d.r; })
                  .on("click", function(d) { return zoom(node == d ? root : d); });

              vis.selectAll("text")
                  .data(nodes)
                .enter().append("svg:text")
                  .attr("class", function(d) { return d.children ? "parent" : "child"; })
                  .attr("x", function(d) { return d.x; })
                  .attr("y", function(d) { return d.y; })
                  .attr("dy", ".35em")
                  .attr("text-anchor", "middle")
                  .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
                  .text(function(d) { return d.name; });

              d3.select(window).on("click", function() { zoom(root); });
            });

            function zoom(d, i) {
              var k = r / d.r / 2;
              x.domain([d.x - d.r, d.x + d.r]);
              y.domain([d.y - d.r, d.y + d.r]);

              var t = vis.transition()
                  .duration(d3.event.altKey ? 7500 : 750);

              t.selectAll("circle")
                  .attr("cx", function(d) { return x(d.x); })
                  .attr("cy", function(d) { return y(d.y); })
                  .attr("r", function(d) { return k * d.r; });

              t.selectAll("text")
                  .attr("x", function(d) { return x(d.x); })
                  .attr("y", function(d) { return y(d.y); })
                  .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

              node = d;
              d3.event.stopPropagation();
            }
          });
        }
      } );

    } ).
    error();

  

  function createDepartment ( department, chart, cb ) {
    employment.getEmploymentsByDepartment( { department: department }).
      success( function ( employments ) {
        if ( employments.length < 1 ){
          chart.children.push( { name: department, children: [] } );
        } else {
          var highest = getHighestEmployment( employments );
          employmentTree.getSmallEmploymentsTree( { employment: highest} ).
            success( function ( data ) {
              chart.children.push( { name: department, children: data } );
              if ( cb !== undefined ) {
                cb( chart );
              }
            } ).
            error();
        }
      } ).
      error();
  };

  function getHighestEmployment ( employments ) {
    var highest = '',
        counter = Infinity;
    employments.forEach( function ( element, index, array ) {
      if ( element.route.length < counter ) {
        counter = element.route.length;
        highest = element.name;
      }
    } );

    return highest;
  }
}
