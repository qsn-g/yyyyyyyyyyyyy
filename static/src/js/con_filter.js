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
 for (var j in fil_v["con"]){
   $('#con_v_all'+id)
   .append('<div calss="n_fil_con"><h6>'+j+'</h6><div class="slider" id="slider'+j+'"></div><div class ="filter_font"><p id ="value-range"></p></div></div>')
 }




$(".fil_v").attr("style","display:none;");

// $("input[type='checkbox']").each(function() {
//       $(this).attr("checked", true);
//     })

    $("input[type=checkbox]").click();


}

function checkboxOnClick(node,link){
  $("input[type=checkbox]").click(function(){
    var checkbox_value=$(this).attr('value');
    var checkbox_name=$(this).attr('name');
    if($("#cat"+checkbox_name+'_'+checkbox_value).is(":checked")){

      // fil_select.add()
      //   // d3.select("#detailsvg"+currentID).selectAll("."+checkbox_name+checkbox_value).attr("r",7)
      //   d3.select("#detailsvg"+currentID).selectAll('circle').attr('class',function(d){
      //     if (d[checkbox_name]==checkbox_value){ return "fil_sel";}
      //   })
      link.each(function(d){
        if(d['source'][checkbox_name]==checkbox_value && d['target'][checkbox_name]==checkbox_value){
            $(this).attr("class","fil_select");
        }
      })
      node.each(function(d){
        if(d[checkbox_name]==checkbox_value){
          $(this).attr("class","fil_select");

        }
      })
      d3.select("#detailsvg"+currentID).selectAll(".fil_select").style("opacity", 0.7)
    }
    else{
      // d3.select("#detailsvg"+currentID).selectAll('circle').attr('class',function(d){
      //   if (d[checkbox_name]==checkbox_value){ return null;}
      // })
      link.each(function(d){
        if(d['source'][checkbox_name]==checkbox_value || d['target'][checkbox_name]==checkbox_value){
            $(this).attr("class","none");
        }
      })
      // d3.select("#detailsvg"+currentID).selectAll("."+checkbox_name+checkbox_value).attr("r",0)
      node.each(function(d){
        if(d[checkbox_name]==checkbox_value){
          $(this).attr("class","none")
        }
      })
  d3.select("#detailsvg"+currentID).selectAll(".none").style("opacity", 0)
    }
  })
}
// window.onload = function() {
// 			checkboxOnClick();
// 		};
