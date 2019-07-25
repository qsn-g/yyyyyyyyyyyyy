function initfilter(){

  var id = 'tabItem1'
  var f_fun=$('#'+id).children().last().append("<div class ='fil_v' id ='fil_v"+id+"'>"+
  '<div class="cat_v_all" id = "cat_v_all'+id+'"width="100%">'+
  '</div>'+
  '<div class="con_v_all" id = "con_v_all'+id+'"width="100%">'+
  '</div>'+
  '</div>')
for (var i in fil_v["cat"]){
  $('#cat_v_all'+id)
    .append('<div class="n_fil_cat" id ="div'+i+'"><h6 class = "filter_font">'+i+'</h6>'
           +'<form id ="box'+i+'"><div class="box_inline" id= "inline'+i+'"></div></form>'
           +'</div>')
  var selfil=$();
  for(var j in fil_v["cat"][i]){
    var each = fil_v["cat"][i][j];
    $('#box'+i).append('<label class ="checkbox-inline"><input type ="checkbox" name="'+i+'" id="cat'+i+'_'+each+'" value="'+each+'">'+each+'</label>')
    // selfil = selfil.add('<label class ="checkbox-inline"><input type ="checkbox" name="'+i+'"value="'+each+'">'+each+'</label>')
  }
  // $('#box'+i).append(selfil)

 }
 var slider={};
 var gRange={};

 for (let j in fil_v["con"]){
   max=Math.max.apply(null,fil_v["con"][j])
   min=Math.min.apply(null,fil_v["con"][j])
   $('#con_v_all'+id)
   .append('<div style="height:70px;" calss="n_fil_con"><h6 align="top" >'+j+'</h6><div style=" float:left;" class="slider" id="slider'+j+'"></div><div class ="filter_font"><p class="con_each" style="font-size:10px;" id ="value-range'+j+'"></p></div></div>')
// var sliderRange=d3
  slider[j]=d3
    .sliderBottom()
    .min(min)
    .max(max)
    .width(120)
    .displayValue(j)
    .tickFormat(d3.format('d'))
    .ticks(2)
    .default([min, max])
    .fill('#2196f3')
    .on('onchange', (val) => {
    d3.select('p#value-range'+j).text(val.map(d3.format('d')).join('-'));
    getfil_fil();
    });
    // var gRange = d3
    gRange[j]=d3
    .select('div#slider'+j)
    .append('svg')
    .attr('width', 150)
    .attr('height', 30)
    .attr('class',j)
    .append('g')
    .attr('transform', 'translate(10,10)');

  gRange[j].call(slider[j]);
    d3.select('p#value-range'+j).attr('weight',50).text(
    slider[j]
      .value()
      .map(d3.format('d'))
      .join('-')
  );
 }

   $(".fil_v").attr("style","display:none;");

// $("input[type='checkbox']").each(function() {
//       $(this).attr("checked", true);
//     })

    $("input[type=checkbox]").click();
    $("input[type=checkbox]").click(function(){
        getfil_fil();
      })

}

function getfil_fil(){
  let fil_user= $.extend(true,{}, fil_user_o);
  $("input[type='checkbox']").each(function() {
        if ($(this).is(":checked")){
         fil_user['cat'][$(this).attr('name')].push($(this).val())
                      }
  })
  $(".con_each").each(function(){
      fil_user['con'][$(this).attr("id").replace("value-range","")]=$(this).text().split("-")
  })
    var node=d3.select("#detailsvg"+currentID).selectAll("circle")
    var link=d3.select("#detailsvg"+currentID).selectAll("line")
node.each(function(d){
  var judge=1;
  for( var i in fil_user['cat']){

      if(fil_user['cat'][i].indexOf(d[i])<0){
          judge=judge*0
      }
  }
  for (var j in fil_user['con']){
    if(d[j]<fil_user['con'][j][0] || d[j]>fil_user['con'][j][1]){
      judge=judge*0
                  }
          }

    if(judge){
      $(this).attr("class","fil_select");
    }else{$(this).attr("class","none");}
})
link.each(function(d){
  var judge =1;

  for (var i in fil_user['cat']){
    if(fil_user['cat'][i].indexOf(d['target'][i])<0 ||fil_user['cat'][i].indexOf(d['source'][i])<0){
      judge=judge*0
    }
  }
  for (var j in fil_user['con']){
    if(d['target'][j]<fil_user['con'][j][0]||d['target'][j]>fil_user['con'][j][1]||d['source'][j]<fil_user['con'][j][0]||d['source'][j]>fil_user['con'][j][1]){
      judge=judge*0
    }
  }
  if(judge){
    $(this).attr("class","fil_select");
  }else{$(this).attr("class","none");}
})

d3.select("#detailsvg"+currentID).selectAll(".none").style("opacity", 0)
d3.select("#detailsvg"+currentID).selectAll(".fil_select").style("opacity", 0.7)
}

// window.onload = function() {
// 			checkboxOnClick();
// 		};
