var id = [['tabItem1','Node Filter','fil_v'],['tabItem2','Edge Filter']]

function initfilter(){
  $('#tabItem1').children().last().append("<div class ='fil_v' id ='fil_vtabItem1'>"+
  '<h5 style="font-size:1rem;">Node Filter</h5>'+
  '<div style="padding-left:10px;" class="cat_v_all" id = "cat_v_alltabItem1" width="100%">'+
  '</div>'+
  '<div style="padding-left:10px;" class="con_v_all" id = "con_v_alltabItem1" width="100%">'+
  '</div>'+
  '</div>')

for (var i in fil_v["cat"]){
  $('#cat_v_alltabItem1')
    .append('<div class="n_fil_cat" id ="div'+i+'"><h6 class = "filter_font">'+i+'</h6>'
           +'<form id ="box'+i+'"><div class="box_inline" id= "inline'+i+'"></div></form>'
           +'</div>')
  for(var j in fil_v["cat"][i]){
    var each = fil_v["cat"][i][j];
    $('#box'+i).append('<label class ="checkbox-inline"><input type ="checkbox" name="'+i+'" id="cat'+i+'_'+each+'" value="'+each+'">'+each+'</label>')
  }
 }
 var slider={};
 var gRange={};
 for (let j in fil_v["con"]){
   max=Math.max.apply(null,fil_v["con"][j])
   min=Math.min.apply(null,fil_v["con"][j])
   $('#con_v_alltabItem1')
   .append('<div style="height:70px;" calss="n_fil_con"><h6 align="top" >'+j+'</h6><div style=" float:left;" class="slider" id="slider'+j+'"></div><div class ="filter_font"><p class="con_each_v" style="font-size:10px;" id ="value-range'+j+'"></p></div></div>')
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
    $("input[type=checkbox]").click();
    $("input[type=checkbox]").click(function(){
        getfil_fil();
      })

// ============filter_e=======
$('#tabItem2').children().last().append("<div class ='fil_e' id ='fil_etabItem2'>"+
'<h5 style="font-size:1rem;">Edge Filter</h5>'+
'<div style="padding-left:10px;" class="cat_e_all" id = "cat_e_alltabItem2" width="100%">'+
'</div>'+
'<div style="padding-left:10px;" class="con_e_all" id = "con_e_alltabItem2" width="100%">'+
'</div>'+
'</div>')

for (var i in fil_e["cat"]){
$('#cat_e_alltabItem2')
  .append('<div class="n_fil_cat" id ="div'+i+'"><h6 class = "filter_font">'+i+'</h6>'
         +'<form id ="box'+i+'"><div class="box_inline" id= "inline'+i+'"></div></form>'
         +'</div>')
for(var j in fil_e["cat"][i]){
  var each = fil_e["cat"][i][j];
  $('#box'+i).append('<label class ="checkbox-inline"><input type ="checkbox" name="'+i+'" id="cat'+i+'_'+each+'" value="'+each+'">'+each+'</label>')
}
}
var slider_e={};
var gRange_e={};
for (let j in fil_e["con"]){
 max=Math.max.apply(null,fil_e["con"][j])
 min=Math.min.apply(null,fil_e["con"][j])
 $('#con_e_alltabItem2')
 .append('<div style="height:70px;" calss="n_fil_con"><h6 align="top" >'+j+'</h6><div style=" float:left;" class="slider" id="slider'+j+'"></div><div class ="filter_font"><p class="con_each_e" style="font-size:10px;" id ="value-range'+j+'"></p></div></div>')
slider_e[j]=d3
  .sliderBottom()
  .min(min)
  .max(max)
  .width(120)
  .tickFormat(d3.format('d'))
  .ticks(2)
  .default([min, max])
  .fill('#2196f3')
  .on('onchange', (val) => {
  d3.select('p#value-range'+j).text(val.map(d3.format('d')).join('-'));
  getfil_e();
  });
  // var gRange = d3
  gRange_e[j]=d3
  .select('div#slider'+j)
  .append('svg')
  .attr('width', 150)
  .attr('height', 30)
  .attr('class',j)
  .append('g')
  .attr('transform', 'translate(10,10)');

gRange_e[j].call(slider_e[j]);
  d3.select('p#value-range'+j).attr('weight',50).text(
  slider_e[j]
    .value()
    .map(d3.format('d'))
    .join('-')
);
}

 $(".fil_e").attr("style","display:none;");
  $(".fil_e input[type=checkbox]").click();
  $(".fil_e input[type=checkbox]").click(function(){
      getfil_e();
    })


}

function getfil_e(){
  let fil_user ={}
  check_all(fil_user);
  let link=d3.select("#detailsvg"+currentID).selectAll("line")
  link.each(function(d){
    var judge =1;

    for (let i in fil_user['e']['cat']){
      if(fil_user['e']['cat'][i].indexOf(d['target'][i])<0 ||fil_user['e']['cat'][i].indexOf(d['source'][i])<0){
        judge=judge*0
      }
    }
    for (let i in fil_user['v']['cat']){
      if(fil_user['v']['cat'][i].indexOf(d['target'][i])<0 ||fil_user['v']['cat'][i].indexOf(d['source'][i])<0){
        judge=judge*0
      }
    }
    for (let j in fil_user['e']['con']){
      if(d[j]<fil_user['e']['con'][j][0]||d[j]>fil_user['e']['con'][j][1]){
        judge=judge*0
      }
    }
    for (let j in fil_user['v']['con']){
      if(d['target'][j]<fil_user['v']['con'][j][0]||d['target'][j]>fil_user['v']['con'][j][1]||d['source'][j]<fil_user['v']['con'][j][0]||d['source'][j]>fil_user['v']['con'][j][1]){
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





function getfil_fil(){
  let fil_user ={}
  check_all(fil_user);

  let node=d3.select("#detailsvg"+currentID).selectAll("circle")
  let link=d3.select("#detailsvg"+currentID).selectAll("line")
node.each(function(d){
  let judge=1;
  for( let i in fil_user['v']['cat']){
      if(fil_user['v']['cat'][i].indexOf(d[i])<0){
          judge=judge*0
      }
  }
  for (let j in fil_user['v']['con']){
    if(d[j]<fil_user['v']['con'][j][0] || d[j]>fil_user['v']['con'][j][1]){
      judge=judge*0
                  }
          }
    if(judge){
      $(this).attr("class","fil_select");
    }else{$(this).attr("class","none");}
})
link.each(function(d){
  let judge =1;
  for (let i in fil_user['v']['cat']){
    if(fil_user['v']['cat'][i].indexOf(d['target'][i])<0 ||fil_user['v']['cat'][i].indexOf(d['source'][i])<0){
      judge=judge*0
    }
  }
  for (let j in fil_user['v']['con']){
    if(d['target'][j]<fil_user['v']['con'][j][0]||d['target'][j]>fil_user['v']['con'][j][1]||d['source'][j]<fil_user['v']['con'][j][0]||d['source'][j]>fil_user['v']['con'][j][1]){
      judge=judge*0
    }
  }
  for (let j in fil_user['e']['con']){
    if(d[j]<fil_user['e']['con'][j][0]||d[j]>fil_user['e']['con'][j][1]){
      judge=judge*0
    }
  }
  for (let i in fil_user['e']['cat']){
    if(fil_user['e']['cat'][i].indexOf(d['target'][i])<0 ||fil_user['e']['cat'][i].indexOf(d['source'][i])<0){
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





function check_all(fil_user){

fil_user['e']=$.extend(true,{}, fil_user_e);
fil_user['v']=$.extend(true,{}, fil_user_o)
$(".fil_e input[type='checkbox']").each(function() {
      if ($(this).is(":checked")){
       fil_user['e']['cat'][$(this).attr('name')].push($(this).val())
                    }
})
$(".con_each_e").each(function(){
    fil_user['e']['con'][$(this).attr("id").replace("value-range","")]=($(this).text().split("-")).map(Number)
})

$(".fil_v input[type='checkbox']").each(function() {
      if ($(this).is(":checked")){
       fil_user['v']['cat'][$(this).attr('name')].push($(this).val())
                    }
})
$(".con_each_v").each(function(){
    fil_user['v']['con'][$(this).attr("id").replace("value-range","")]=($(this).text().split("-")).map(Number)
})

}



// window.onload = function() {
// 			checkboxOnClick();
// 		};
