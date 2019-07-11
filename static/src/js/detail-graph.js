
function drawDetail() {
    /** Functions **/

    //Function to choose what color circle we have
    //Let's return blue for males and red for females
    function circleColour(d){
    	if(d.sex =="M"){
    		return "skyblue";
    	} else {
    		return "pink";
    	}
    }

    //Function to choose the line colour and thickness
    //If the link type is "A" return green
    //If the link type is "E" return red
    function linkColour(d){
    	if(d.type == "A"){
    		return "green";
    	} else {
    		return "red";
    	}
    }

    //Drag functions
    //d is the node
    function drag_start(d) {
     if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    //make sure you can't drag the circle outside the box
    function drag_drag(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function drag_end(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    //Zoom functions
    function zoom_actions(){
        g.attr("transform", d3.event.transform)
    }

    function tickActions() {
        //update circle positions each tick of the simulation
           node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        //update link positions
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    }

    var input = []
    for(var each in selData[parent[currentID]]['items']){
        input.push(each);
    }

    calculatedData = calculation(input)
    var nodes_data = calculatedData['node']
    var links_data = calculatedData['link']

    //create somewhere to put the force directed graph
    var svg = d3.select("#" + currentID).append("svg")
        .attr("class", "svg")
        .attr("id", "svg" + currentID)
        .attr("width", width)
        .attr("height", height)
    var g = svg.append("g")

    //set up the simulation and add forces
    var simulation = d3.forceSimulation()
    					.nodes(nodes_data);

    var link_force =  d3.forceLink(links_data)
                            .id(function(d) { return d.name; });

    var charge_force = d3.forceManyBody()
        .strength(-8);

    var center_force = d3.forceCenter(width / 2, height / 2);

    simulation
        .force("charge_force", charge_force)
        .force("center_force", center_force)
        .force("links",link_force)
     ;

    //add tick instructions:
    simulation.on("tick", tickActions );

    forceDictDetail[currentID] = simulation;

    //draw lines for the links
    var link = g.append("g")
          .attr("class", "links")
        .selectAll("line")
        .data(links_data)
        .enter().append("line")
        .style("stroke", "grey")         // colour the line
        .style("stroke-width", function(d){
            if(d.type == "E") return 3;
            else return 1;
        })        // adjust line width

    //draw circles for the nodes
    var node = g.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodes_data)
            .enter()
            .append("circle")
            .attr("r", 10)
            .attr("fill", circleColour)
            .style('opacity', 0.7)

    //add drag capabilities
    var drag_handler = d3.drag()
    	.on("start", drag_start)
    	.on("drag", drag_drag)
    	.on("end", drag_end);

    drag_handler(node);

    //add zoom capabilities
    var zoom_handler = d3.zoom()
        .on("zoom", zoom_actions);

    zoom_handler(svg);
}
