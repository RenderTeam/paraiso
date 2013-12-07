  function init() {
    if (window.goSamples) { goSamples(); }
    // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates

    myDiagram =
      $(go.Diagram, "myDiagram",  // must be the ID or reference to div
        { allowCopy: false });

    var bluegrad = $(go.Brush, go.Brush.Linear,
                      { 0: "rgb(60, 204, 254)", 1: "rgb(70, 172, 254)" });
    var pinkgrad = $(go.Brush, go.Brush.Linear, 
                      { 0: "rgb(255, 192, 203)", 1: "rgb(255, 142, 203)" });

    // Set up a Part as a legend, and place it directly on the diagram
    myDiagram.add(
      $(go.Part, "Table",
        { position: new go.Point(5, 200),
          selectable: false },
        $(go.TextBlock, "Key",
          { row: 0,
            font: "10pt Helvetica, Arial, sans-serif" }),  // end row 0
        $(go.Panel, "Horizontal",
          { row: 1,
            alignment: go.Spot.Left },
          $(go.Shape, "Rectangle",
            { desiredSize: new go.Size(30, 30),
              fill: bluegrad,
              margin: 5 }),
          $(go.TextBlock, "Hombres",
            { font: "bold 8pt Helvetica, bold Arial, sans-serif" })
        ),  // end row 1
        $(go.Panel, "Horizontal",
          { row: 2,
            alignment: go.Spot.Left },
          $(go.Shape, "Rectangle",
            { desiredSize: new go.Size(30, 30),
              fill: pinkgrad,
              margin: 5 }),
          $(go.TextBlock, "Ladys Guapas",
            { font: "bold 8pt Helvetica, bold Arial, sans-serif" })
        )  // end row 2
      ));

    // get tooltip text from the object's data
    function tooltipTextConverter ( person ) {
      var str = "";
      str += "Born: " + person.birthYear;
      if (person.deathYear !== undefined) str += "\nDied: " + person.deathYear;
      if (person.reign !== undefined) str += "\nReign: " + person.reign;
      return str;
    }

    // define tooltips for nodes
    var tooltiptemplate =
      $(go.Adornment, "Auto",
        $(go.Shape, "Rectangle",
          { fill: "whitesmoke",
            stroke: "black" }),
        $(go.TextBlock,
          { font: "bold 8pt Helvetica, bold Arial, sans-serif",
            wrap: go.TextBlock.WrapFit,
            margin: 5 },
          new go.Binding("text", "", tooltipTextConverter))
      );

    // define Converters to be used for Bindings
    function genderBrushConverter(gender) {
      if (gender === "M") return bluegrad;
      if (gender === "F") return pinkgrad;
      return "orange";
    }

    // replace the default Node template in the nodeTemplateMap
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        { deletable: false,
          toolTip: tooltiptemplate },
        new go.Binding("text", "name"),
        $(go.Shape, "Rectangle",
          { fill: "lightgray",
            stroke: "black",
            stretch: go.GraphObject.Fill,
            alignment: go.Spot.Center },
          new go.Binding("fill", "gender", genderBrushConverter)),
        $(go.TextBlock,
          { font: "bold 8pt Helvetica, bold Arial, sans-serif",
            alignment: go.Spot.Center,
            margin: 6 },
          new go.Binding("text", "name"))
      );

    // define the Link template
    myDiagram.linkTemplate =
      $(go.Link,  // the whole link panel
        { routing: go.Link.Orthogonal,
          corner: 5,
          selectable: false },
        $(go.Shape));  // the default black link shape

    // here's the family data
    var nodeDataArray = [
      { key: 0, name: "Render", gender: "M", birthYear: "1865", deathYear: "1936", reign: "1910-1936" },
        { key: 1, parent: 0, name: "Subdirector de Administración", gender: "M", birthYear: "1894", deathYear: "1972", reign: "1936" },
          { key: 11, parent: 1, name: "Contador", gender: "M", birthYear: "1926", reign: "1952-" },
          { key: 12, parent: 1, name: "Abogados", gender: "M", birthYear: "1926", reign: "1952-" },
          { key: 13, parent: 1, name: "Marketing", gender: "M", birthYear: "1926", reign: "1952-" },
        { key: 2, parent: 0, name: "Subdirector de Desarrollo", gender: "M", birthYear: "1895", deathYear: "1952", reign: "1936-1952" },
          { key: 21, parent: 2, name: "Diseñador", gender: "F", birthYear: "1926", reign: "1952-" },
          { key: 23, parent: 2, name: "Admistrador de Proyectos", gender: "M", birthYear: "1926", reign: "1952-" },
            { key: 231, parent: 23, name: "Programadores", gender: "M", birthYear: "1926", reign: "1952-" },
          { key: 24, parent: 2, name: "Administrador de Base de Datos", gender: "M", birthYear: "1926", reign: "1952-" }
    ];

    // create the model for the family tree
    myDiagram.model = new go.TreeModel(nodeDataArray);

    // create a TreeLayout for the family tree
    myDiagram.layout =
      $(go.TreeLayout,
        { angle: 90,
          nodeSpacing: 5 });
  }