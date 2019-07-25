
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

    var input = {}
    for(var each in selData[currentID]['items']){
        input[each]=(selData[currentID]['items'][each]['pass']);
    }

      $.post('/detail',JSON.stringify(input),function(data,status){
        calculatedData = data;
        console.log(calculatedData)
        var node_data = calculatedData['nodes']
        node_data.forEach(function(d){
          d.cx = parseFloat(d.cx)
          d.cy = parseFloat(d.cy)
        })
        data.links.forEach(function(d){
          // var s_line={}
          // s_line["cx"]=node_data[d.source]['cx']
          // s_line["cy"]=node_data[d.source]['cy']
          // s_line['s_id'] = node_data[d.source]['name']
          // d.source = s_line
          // d.source={"cx":node_data[d.source]["cx"],"cy":node_data[d.source]["cy"],"name":node_data[d.source]["name"]}
          d.source = node_data[d.source]
          // var s_line={}
          // s_line["cx"]=node_data[d.target]['cx']
          // s_line["cy"]=node_data[d.target]['cy']
          // s_line['s_id'] = node_data[d.target]['name']
          // d.target = s_line
          // d.target={"cx":node_data[d.target]["cx"],"cy":node_data[d.target]["cy"],"name":node_data[d.target]["name"]}

          d.target = node_data[d.target]
        })

        //create somewhere to put the force directed graph
        var svg = d3.select("#" + currentID).append("svg")
            .attr("class", "svg")
            .attr("id", "detailsvg" + currentID)
            .attr("width", width)
            .attr("height", height)
        var g = svg.append("g");
        // var simulation = d3.forceSimulation()
        //    .force("link", d3.forceLink().id(function(d) { return d.name }));

        // forceDictDetail[currentID] = simulation;

        //draw lines for the links
        var link = g.append("g")
              .attr("class", "links")
            .selectAll("line")
            .data(data.links)
            .enter().append("line")
            .attr('x1',function(d){
              return d.source.cx;
            })
            .attr('y1',function(d){
              return d.source.cy;
            })
            .attr('x2',function(d){
              return d.target.cx;
            })
            .attr('y2',function(d){
              return d.target.cy;
            })
            .style("opacity", 0.7)
            .style("stroke", "grey")         // colour the line
            .style('stroke-width',0.5);
            // .style("stroke-width", function(d){
            //     if(d.type == "E") return 3;
            //     else return 1;
            // })        // adjust line width
            //Zoom functions
        function zoom_actions(){
            g.attr("transform", d3.event.transform)
        }
        var zoom_handler = d3.zoom()
            .on("zoom", zoom_actions);

        zoom_handler(svg);
        //draw circles for the nodes
        var node = g.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(node_data)
                .enter()
                .append("circle")
                .attr('id',function(d){
                return d.name
                })
                // .attr('class',function(d){
                //   var att=''
                //   k=Object.keys(d)
                //   for (i in k){
                //     att=att+k[i]+d[k[i]]+" "
                //   }
                //   return att
                // })
                .attr("r", 7)
                .attr('fill','red')
                .attr('cx',function(d){return d.cx})
                .attr('cy',function(d){return d.cy})
                .style('opacity', 0.7)
                .call(d3.drag().on('drag',dragged));

                // .attr("fill", circleColour)
        // node.style('opacity',function(d){
        //
        // })



        // checkboxOnClick(node,link);

        // $("input[type=checkbox]").click();
        function dragged(d) {
          d.x = d3.event.x, d.y = d3.event.y;
          d3.select(this).attr("cx", d.x).attr("cy", d.y);
          link.filter(function(l) { return l.source === d; }).attr("x1", d.x).attr("y1", d.y);
          link.filter(function(l) { return l.target === d; }).attr("x2", d.x).attr("y2", d.y);
        }


      })

}
