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
    $('#box'+i).append('<label class ="checkbox-inline"><input type ="checkbox" name="'+i+'"value="'+each+'">'+each+'</label>')
    // selfil = selfil.add('<label class ="checkbox-inline"><input type ="checkbox" name="'+i+'"value="'+each+'">'+each+'</label>')
  }
  // $('#box'+i).append(selfil)
console.log($('#box'+i))
 }
$(".fil_v").attr("style","display:none;")
}
