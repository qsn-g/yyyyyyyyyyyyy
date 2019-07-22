$("#controlBut").click(function() {
    event.preventDefault();
    var dict;
    console.log(parent)
    console.log(selData)
    console.log(forceDict)

    if(currentID in parent) {
        dict = forceDictDetail;
    } else {
        dict = forceDict;
    }
    controlBut = 1 - controlBut;
    width = svgWidth[controlBut]
    if(controlBut == 1) {
        $('#svg'+currentID).width(width)
        dict[currentID].force("center", d3.forceCenter(width / 2, height / 2))
        dict[currentID].alpha(1).restart();
    } else {
        setTimeout(function(){
            $('#svg'+currentID).width(width)
            dict[currentID].force("center", d3.forceCenter(width / 2, height / 2))
            dict[currentID].alpha(1).restart();
        },300);
    }
})
$("#hisBut").click(function() {
    var dict;
    if(currentID in parent) {
        dict = forceDictDetail;
    } else {
        dict = forceDict;
    }
    hisBut = 1 - hisBut;
    height = svgHeight[hisBut]
    if(hisBut == 1) {
        $('#svg'+currentID).height(height)
        dict[currentID].force("center", d3.forceCenter(width / 2, height / 2))
        dict[currentID].alpha(1).restart();
    } else {
        setTimeout(function(){
            $('#svg'+currentID).height(height)
            dict[currentID].force("center", d3.forceCenter(width / 2, height / 2))
            dict[currentID].alpha(1).restart();
        },300);
    }
})


/*function drawall() {
    var svg = d3.select("#" + currentID).append("svg")
        .attr("class", "svg")
        .attr("id", "svg" + currentID)
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom().on('zoom',function(){
            svg.attr('transform',d3.event.transform)
        }))
        .append("g")
    var force = d3.forceSimulation()
       .force("link", d3.forceLink().id(function(d) { return d.name }));
       // .force("charge", d3.forceManyBody())
       // .force("center", d3.forceCenter(width / 2, height / 2));





    $.get("/request1",function(data,status){

        n_data= data.nodes
        n_data.forEach(function(d){
            d.cx = parseFloat(d.cx)
            d.cy = parseFloat(d.cy)
        })
        // console.log(n_data.indexOf("875" == n_data[name]))
        console.log(data)
        data.links.forEach(function(d){
           d.source = n_data[d.source]
           d.target = n_data[d.target]
            // d.source_x = parseFloat(d.source_x)
            // d.source_y = parseFloat(d.source_y)
            // d.target_x = parseFloat(d.target_x)
            // d.target_y = parseFloat(d.target_y)
            // if (d.source == n_data[name]){
            //     n=n_data.indexOf(d.source == n_data[name])
            //     d.source = n_data[n]
            // }else if(d.target==n_data[name]){
            //     n=n_data.indexOf(d.source == n_data[name])
            //     d.target = n_data[n]
            // }
        });


        // console.log(e_data)
        // force
        //     .nodes(n_data)
        //     .force("link").links(data.links)

        var link = svg.selectAll(".link")
            .data(data.links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("x1", function (d) {
                return d.source.cx;
            })
            .attr("y1", function (d) {
                return d.source.cy;
            })
            .attr("x2", function (d) {
                return d.target.cx;
            })
            .attr("y2", function (d) {
                return d.target.cy;
            })
            .attr("strok-width", 0.5)
            .attr("stroke","black");

        var node = svg.selectAll(".node")
            .data(n_data)
            .enter().append("g")
            .attr("class", "node");


        node.append('circle')
            .attr('class', function (d) { return 'node' + currentID + " " + currentID + "-" + d.name; })
            .attr('r', 1)
            .attr('fill', "red")
            .attr('cx',function(d){return d.cx;})
            .attr('cy',function(d){return d.cy;})
            .call(d3.drag().on("drag", dragged));

            // .attr('fill', function (d) { return color(d.level); });


        // force.on("tick", function () {
        //     link.attr("x1", function (d) {
        //         console.log(d.source.cx)
        //             return d.source.cx;

        //         })
        //         .attr("y1", function (d) {
        //             return d.source.cy;
        //         })
        //         .attr("x2", function (d) {
        //             return d.target.cx;
        //         })
        //         .attr("y2", function (d) {
        //             return d.target.cy;
        //         });
        //     node.attr("transform", function (d) {
        //         return "translate(" + d.cx + "," + d.cy + ")";
        //     });
        //     })
  function dragged(d) {
    d.x = d3.event.x, d.y = d3.event.y;
    d3.select(this).attr("cx", d.x).attr("cy", d.y);
    link.filter(function(l) { return l.source === d; }).attr("x1", d.x).attr("y1", d.y);
    link.filter(function(l) { return l.target === d; }).attr("x2", d.x).attr("y2", d.y);
  }
        })

    // function dragstarted(d) {
    //     if (!d3.event.active) force.alphaTarget(0.5).restart();
    //     d.fx = d.cx;
    //     d.fy = d.cy;
    // }

    // function dragged(d) {
    //     d.fx = d3.event.x;
    //     d.fy = d3.event.y;
    // }

    // function dragended(d) {
    //     if (!d3.event.active) force.alphaTarget(0.5);
    //     d.fx = null;
    //     d.fy = null;
    // }



// function dragstarted(d) {
//   d3.select(this).raise().classed("active", true);
// }

// function dragged(d) {
//   d3.select(this).select("circle")
//     .attr("cx", d.x = d3.event.x)
//     .attr("cy", d.y = d3.event.y);
//   d3.select(this).select("line")
//     // .attr("x1", d.x = d3.event.x)
//     // .attr("y1", d.y = d3.event.y);
// }

// function dragended(d) {
//   d3.select(this).classed("active", false);
// }


}*/



function drawOverview() {

    var force = d3.forceSimulation()
       .force("charge", d3.forceManyBody())
       .force("link", d3.forceLink().id(function(d) { return d.ind }))
       .force("center", d3.forceCenter(width / 2, height / 2));


    forceDict[currentID] = force;

    var svg = d3.select("#" + currentID).append("svg")
        .attr("class", "svg")
        .attr("id", "svg" + currentID)
        .attr("width", width)
        .attr("height", height)
        .append("g")

$.get("/overview",function(data,status){


  fb_overview_data=data;
    // d3.json("static/src/data/FB_overview.json", function (error, fb_overview_data) {
    //     if (error) throw error;
        force
            .nodes(fb_overview_data.nodes)
            .force("link").links(fb_overview_data.links)
        var link = svg.selectAll(".link")
            .data(fb_overview_data.links)
            .enter()
            .append("line")
            .attr("class", "link");

        var node = svg.selectAll(".node")
            .data(fb_overview_data.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr('id',function(d){return 'overnode'+d.name})
            .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))

        node.append('circle')
            .attr('class', function (d) { return 'node' + currentID + " " + currentID + "-" + d.name; })
            .attr('r', 10)
            .attr('fill', function (d) { return color(d.level); });

        // =========== events =============
        node.on('mouseover', function(d){
            if(d.level != 0){
                if(selData[currentID]['close'] == true) {
                    $("#sel" + currentID).position({
                        my: "left top",
                        at: "left top",
                        of: "#selbut" + currentID,
                        within: "#" + currentID
                    });
                    $("#selbut"+currentID).css("visibility", "hidden");
                    $("#sel"+currentID).css("visibility", "visible");
                    selData[currentID]["close"] = false;

                }
                if(!(d.name in selData[currentID]['items'])) {
                    updateNodes();
                    $('#selbody' + currentID).prepend( '<div class="selectedBox" id="sb-' + d.name +
                        '" style="background-color: ' + hexToRGB(color(infoDict[d.name]['level']), 0.4) + '">' +
                            '<button type="button" class="btn btn-light btn-xs sbclose" id="sbclose-' + d.name + '"> X </button>' +
                            '<div class="sbinfo">' +
                                '<h6> name: ' + d.show_name + ' </h6>' +
                                '<h6> FBusers: ' + infoDict[d.name]['value'] + ' </h6>' +
                                '<h6> level: ' + infoDict[d.name]['level'] + ' </h6>' +
                            '</div>' +
                        '</div>'
                    );
                }
                d3.selectAll("." + currentID + '-' + d.name)
                .attr("r", 15);
            }
        }).on('mouseout', function(d){
            if(d.level != 0){
                if(!(d.name in selData[currentID]['items'])) {
                    removeItem(d.name, false);
                }
                else {
                    d3.selectAll("." + currentID + '-' + d.name)
                    .attr("r", 10);
                }
            }
        }).on('click', function(d){
              // recordevent(event,currentID)

            if(d.level != 0){
                addItem(d.name, false);
            }


        });

        force.on("tick", function () {
            link.attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });
            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        });
    // });

drawSelected();

});
    function dragstarted(d) {
        if (!d3.event.active) force.alphaTarget(0.5).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) force.alphaTarget(0.5);
        d.fx = null;
        d.fy = null;
    }

}
function drawOnetab() {
    // drawall();
    drawOverview();
    // drawInstruction();

}
drawOnetab()
