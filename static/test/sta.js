var staId = ["tabItem1", "tabItem2"];
var staData = {'tabItem1': {
    'data': ['Gender', 'Birth Year', 'Marriage', 'Score Level'],
    'graph': ['Bar Chart', 'Donut Chart', 'Scatter Plot'],
}, 'tabItem2': {
    'data': [],
    'graph': [],
}}
var curSelected = { 'tabItem1':
    ["Gender", "Bar Chart"],
    'tabItem2':
    ["", ""]
}
// initSta();
var inputData;

function initSta() {
    // ===== init =====
    for(var i in staId) {
        var id = staId[i];
        $("#" + id).children().last()
        .append("<div class='staheader' id='staheader-" + id + "'>" +
            '<select class="selectpicker selectData" id="selectData-' + id + '" data-width="48%">' +
            '</select>' +
            '<select class="selectpicker selectGraph" id="selectGraph-' + id + '" data-width="48%">' +
            '</select>' +
        "</div>" +
        "<div class='stabody' id='stabody-" + id + "'>" +
        "</div>")

        var seldata = $();

        for(var i in staData[id]['data']) {
            var each = staData[id]['data'][i];
            seldata = seldata.add('<option>'+each+'</option>');
        }
        $('#selectData-'+id).append(seldata)

        var selgraph = $();
        for(var i in staData[id]['graph']) {
            var each = staData[id]['graph'][i];
            selgraph = selgraph.add('<option>'+each+'</option>');
        }
        $('#selectGraph-'+id).append(selgraph)
        // drawGraph(id);
    }
}

function randomData() {
    for(var i in inputData) {
        inputData[i].y = Math.floor((Math.random() * 40) + 15);
    }
}

function updateSta(tabId) {
    var input = []
    // tab Id selection problem
    for(var each in selData[currentID]['items']){
        input.push(each);
    }
    switch (curSelected[tabId][0]) {
        case "Birth Year":
            inputData = birthyer_sts(input)
            break;
        case "Gender":
            inputData = gender_sts(input)
            break;
        case "Marriage":
            inputData = marriage_sts(input)
            break;
        case "Score Level":
            inputData = scorelevel_sts(input)
            break;
        default:
            break;
    }
}

function drawGraph(tabId) {
    if(curSelected[tabId][0] != "" && curSelected[tabId][1] != "") {
        updateSta(tabId)
        switch (curSelected[tabId][1]) {
            case "Bar Chart":
                drawBar(tabId)
                break;
            case "Donut Chart":
                drawDonut(tabId)
                break;
            case "Scatter Plot":
                drawScatterPlot(tabId)
                break;
            default:
                break;
        }
    }
}

// d3.json("src/data/sta.json", function(data){
//     inputData = data['data'];
//     initSta();
// })

$(document).on('changed.bs.select', '.selectpicker', function (e, clickedIndex, isSelected, previousValue) {
    var tabId = $(this).attr('id');
    var selectId = tabId.substr(0, tabId.indexOf('-'));
    tabId = tabId.substr(tabId.indexOf('-')+1);
    if(selectId == 'selectData') {
        curSelected[tabId][0] = staData[tabId]['data'][clickedIndex];
    } else {
        curSelected[tabId][1] = staData[tabId]['graph'][clickedIndex];
    }
    // drawGraph(tabId);
});
