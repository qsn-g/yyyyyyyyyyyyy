var color = d3.scaleOrdinal().range(["#b52b2b", "#63a375","#87bcde","#d57a66"])
var composeCount = 1;
var currentID = 'tab1';
var width, height;
var empty;
var fb_overview_data;
var forceDict = {};
var forceDictDetail = {};
var instDict = {};

var controlWidth = 320;
var historyWidth = 150;
var svgWidth, svgHeight;

var hisBut = 1, controlBut = 1;
var instData = [];
var selData = [];

var infoDict = {};

var parent = {};
var detailData = {};

var prelink = {}, prenode = {};

var calculatedData = {};

var record={};
var fil_v;
var fil_user_o={}
$.get('/init',function(data,status){
  for(var j in data['con']){
    data['con'][j]=data['con'][j].map(Number)
  }
  fil_v={'con':data['con'],'cat':data['cat']}
  fil_user_o = data['fil']

  initfilter();

})

d3.json("static/src/data/prenode.json", function(data){
    prenode = data;
})

d3.json("static/src/data/prelink.json", function(data){
    prelink = data
})

d3.json("static/src/data/infor.json", function(data){
    infoDict = data;
})

$.getJSON( "static/src/data/ins.json", function( data ) {
    jQuery.extend(true, instData, data);
})

$('#content-his').append(

    '<ul class="nav nav-tabs" id="multi-tabs">'+
        '<li class="nav-item multi-item" id="litab1">'+
            '<a class="nav-link multi-link active" data-toggle="tab" id="atab1" href="#tab1">'+
                '<button class="close" value=1>×</button>Tab 1'+
            '</a>'+
        '</li>'+
        '<button class="btn btn-light btn-sm" id="new-tab"> + </button>'+
    '</ul>'+
    '<div class="tab-content" id="multi-tabs-content">'+
        '<div class="tab-pane multi-pane active" id="tab1">'+
            // '<p> Tab 1 </p>'+
        '</div>'+
    '</div>'
)

$('#history').append('<h3 style="text-align:center; opacity:0.5;""> No History</h3>')
width = $('#'+currentID).width() ;
height = $('#'+currentID).height() ;
svgWidth = {1: width, 0: width+controlWidth}
svgHeight = {1: height, 0: height+historyWidth}


function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

function recordevent(e,currentID){
  if(!(currentID in Object.keys(record))){
    record[currentID]=[]
  }
  var s_ope=[]
  s_ope={
    target:e.target.attributes,
    type: e.type
  }
  record[currentID].push(s_ope
  )
  console.log(record)
}



function reimplement(){


  record[currentID].forEach(function(elem){
    var t = elem.target
    var w_op=elem.type
    console.log('.'+t)
    $("#overnoderegion3").click()
    // t['on'+elem.type]=true
  })

}
