function SELECT(elm_data){
  console.log(elm_data);
  switch (elm_data) {
    case 2:
      d3.select('#'+currentID).select('svg').selectAll('.node'+currentID)
     .attr('fill', 　function(d){return color(d.level);}) ;
      break;
    case 4:
      d3.select('#'+currentID).select('svg').selectAll('.node'+currentID)
      .attr('fill', "#b52b2b") ;
      break;
    case 5:
       d3.select('#'+currentID).select('svg').selectAll('.node'+currentID)
        .attr('r', 10);
        break;
    case 6:
     var scale = d3.scaleLinear().domain([10,550]).range([5,20]);
     d3.select('#'+currentID).select('svg').selectAll('.node'+currentID)
      .attr('r', function(d){return scale(d.value);});
      break;
    default:
  }
}
