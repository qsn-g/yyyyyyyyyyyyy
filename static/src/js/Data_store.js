// $('#L_data').attr('method','post').attr("action","/Select_Local");
$('#Dataselect').change(function(){

  if ($("#Dataselect").val()==1){
    $('.close').click();
    change_data="fb";
    get_data();
    $('#new-tab').click();
}
  if ($("#Dataselect").val()==2){
    $('.close').click();
    change_data="bully";
    get_data();
    $('#new-tab').click();
  }

});
