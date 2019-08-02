var color = d3.scaleOrdinal().range(["#b52b2b", "#63a375","#87bcde","#d57a66"])
var composeCount = 0;
var currentID = 'tab1';
var width, height;
var empty;
var fb_overview_data;
// var instDict = {};
var change_data;
var controlWidth = 320;
var historyWidth = 150;
var svgWidth, svgHeight;

var hisBut = 1, controlBut = 1;
var selData = [];

var infoDict = {};
var detailData = {};

var calculatedData;

var record={};
var fil_v;
var fil_user_o={}
var fil_e;
var fil_user_e={}
var track_status= {}
track_status[currentID]={'tabItem1':{'checkbox':new Array(),'slider':new Array()},'tabItem2':{'checkbox': new Array(),'slider':new Array()}};


function get_data(){
  $.get('/init_'+change_data+'',function(data,status){
    for(let j in data['v']['con']){
      data['v']['con'][j]=data['v']['con'][j].map(Number)
    }
    fil_v={'con':data['v']['con'],'cat':data['v']['cat']}
    fil_user_o = data['v']['fil']

    for(let j in data['e']['con']){
      data['e']['con'][j]=data['e']['con'][j].map(Number)
    }
    fil_e={'con':data['e']['con'],'cat':data['e']['cat']}
    fil_user_e = data['e']['fil']
    initfilter();
  })
  $.get('/infor_'+change_data+'',function(data,status){
    infoDict = data;
  })
}

// $.getJSON( "static/src/data/ins.json", function( data ) {
//     jQuery.extend(true, instData, data);
// })

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
        '</div>'+
    '</div>'
)

$('#history').append('<h3 style="text-align:center; opacity:0.5;""> No History</h3>')
width = $('#'+currentID).width() ;
height = $('#'+currentID).height()+40 ;
svgWidth = {1: width, 0: width+controlWidth}
svgHeight = {1: height, 0: height+historyWidth+60}


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

}



function reimplement(){


  record[currentID].forEach(function(elem){
    var t = elem.target
    var w_op=elem.type
    console.log('.'+t)
    $("#overnoderegion3").click()
  })

}
