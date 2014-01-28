function departmentsChartController ( scope, departments, employment, employmentTree ) {
  var chart = {
    name: '',
    children: [],
    size: 1
  };

  departments.getDepartments().
    success( function ( data ) {
      data.forEach( function ( element, index, array ) {
        if ( index + 1 < array.length ) {
          createDepartment( element.name, chart );
        } else {
          createDepartment( element.name, chart, function ( lol ) {
            chartConstructor( lol )
          });
        }
      } );

    } ).
    error();

  function createDepartment ( department, chart, callback ) {
    employment.getEmploymentsByDepartment( { department: department }).
      success( function ( employments ) {
        if ( employments.length < 1 ){
          chart.children.push( { name: department, children: [], size: 1 } );
        } else {
          var highest = getHighestEmployment( employments );
          employmentTree.getSmallEmploymentsTree( { employment: highest} ).
            success( function ( smallTree ) {
              var children = [];
              children.push(smallTree);
              chart.children.push( { name: department, children: children, size: 1 } );
              if ( callback !== undefined) {
                callback ( chart );
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

function chartConstructor ( chart ) {
  var w = 1100,
      h = 800,
      r = 600,
      x = d3.scale.linear().range([0, r]),
      y = d3.scale.linear().range([0, r]),
      node,
      root;

  var pack = d3.layout.pack()
      .size([r, r])
      .value(function(d) { return d.size; });

  var vis = d3.select("#chart").insert("svg:svg", "h2")
      .attr("width", w)
      .attr("height", h)
    .append("svg:g")
      .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");

  node = root = chart;
  var nodes = pack.nodes(chart);

  vis.selectAll("circle")
      .data(nodes)
    .enter().append("svg:circle")
      .attr("class", function(d) { })
      .attr("class", function ( d ) {
        if ( d.hasOwnProperty( "parent" ) ) {
          if ( !d.parent.hasOwnProperty("parent") ){
            return "department";
          } else {
            return d.children ? "parent" : "child";
          }
        } else {
          return d.children ? "parent" : "child";
        }
      })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", calculateRadius )
      .on("click", function(d) { return zoom(node == d ? root : d); });

  vis.selectAll("text")
      .data(nodes)
    .enter().append("svg:text")
      .attr("class", function ( d ) {
        if ( d.hasOwnProperty( "parent" ) ) {
          if ( !d.parent.hasOwnProperty("parent") ){
            return "department";
          } else {
            return d.children ? "parent" : "child";
          }
        } else {
          return d.children ? "parent" : "child";
        }
      })
      .attr("x", function(d) { return d.x; })
      .attr("y", textYAlign)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
      .text(function(d) { return d.name; });


  d3.select(window).on("click", function() { zoom(root); });

  function zoom(d, i) {
    var k = r / d.r / 2;
    x.domain([d.x - d.r, d.x + d.r]);
    y.domain([d.y - d.r, d.y + d.r]);

    var t = vis.transition()
        .duration(d3.event.altKey ? 7500 : 750);

    t.selectAll("circle")
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .attr("r", function( d ) {
        if ( d.hasOwnProperty( "parent" ) ) {
          return d.parent.children.length === 1 ? k * d.parent.r - 10: k * d.r;
        } else {
          return k* d.r;
        }
      });

    t.selectAll("text")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y - d.r / 4); })
      .attr("y", function(d) {
        var number;
        if ( d.hasOwnProperty( "children" ) ){
            number = d.children.length === 1 ? d.y - d.r / 2:d.y - d.r / 4;
          } else {
            number = d.y - d.r / 4;
          }
        return y(number);
      })
      .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

    node = d;
    d3.event.stopPropagation();
  }
}

function calculateRadius ( d ) {
  if ( d.hasOwnProperty( "parent" ) ) {
    return d.parent.children.length === 1 ? d.parent.r - 10: d.r;
  } else {
    return d.r;
  }
}

function textYAlign ( d ) {
  if ( d.hasOwnProperty( "children" ) ){
    return d.children.length === 1 ? d.y - d.r / 2:d.y - d.r / 4;
  } else {
    return d.y - d.r / 4;
  }
}