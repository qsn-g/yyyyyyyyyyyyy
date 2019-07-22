// var savedPage;
function cleanForDetail() {
    // var oldID = currentID.slice();
    // $("#" + currentID).children()
    $("#svg"+currentID).attr("style","display:none;")
    $("#sel"+currentID).attr("style","display:none;")
    $("#selbut"+currentID).attr("style","display:none;")
    // console.log($("#" + currentID).children())
    // newTab();
    // parent[currentID] = oldID;
    detailData[currentID] = {};
    // Object.assign(detailData[currentID], selData[oldID]["items"])
    Object.assign(detailData[currentID], selData[currentID]["items"])
    $('#' + currentID)
    .append('<button type="button" class="btn btn-primary back" id="back' + currentID + '">Back To Overview</button>');
    $('#' + currentID)
    .append('<div class="alert alert-info alert-dismissible" style="margin:20px;">' +
        '<button class="close" type="button" data-dismiss="alert">×</button>' +
        '<strong>Zoom In!</strong> To see more details of the network.' +
    '</div>')

    drawDetail();
}

function submit(){
    cleanForDetail();

    $(".fil_v").attr("style","display:block;")

}

$(document).on('click', '.back', function(){
    $("#back" + currentID).remove()
    $(".alert" + currentID).remove()
    $("#detailsvg"+currentID).remove()
    $(".fil_v").attr("style","display:none;")
    $("#" + currentID).children().attr("style","display:block;")
    .attr("height",437);
    // $('.multi-link').removeClass('active show');
    // $('.multi-pane').removeClass('active show');
    // $('#'+parent[currentID]).addClass('active show');
    // $('#a'+parent[currentID]).addClass('active show');
    // currentID = parent[currentID]

})
