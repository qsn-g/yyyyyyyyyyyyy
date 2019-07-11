// var msg=["major34", "region4"];
function calculation(msg){

    //var d=$.Deferred();
    //var promise = await new Promise((resolve,reject) => {
    var out_data = {};
    //async function mess(){
          var node_data = {};
          var win = [];
          // console.log (i)
          for (var i=0; i<msg.length; i++){
                win[i]= prenode[msg[i]];
                var arr = Object.keys(win[i]);
               for (var j=0; j<arr.length; j++){
                  node_data[arr[j]]= win[i][arr[j]];
                 // node_data.push(win[i][j])
               }
             }
             var arr_node =Object.keys(node_data);
             var node_data_array =[];
             for (var i in node_data){
                 node_data[i]['name'] = node_data[i].userid;
                 node_data_array.push(node_data[i]);
             }
    // create link array below=============
           var link_data ={};
           var win_l =[];
           for (var i=0 ; i<arr_node.length;i++){
              win_l =prelink["Nodeid"+arr_node[i]];
              // console.log(win_l);
             var array =Object.keys(win_l);
             for (var j= 0; j<array.length; j++){
                link_data[array[j]] = win_l[array[j]];
             }
           }
           // console.log(link_data);// get link dict
           var link_data_array =[];
           for(var i in link_data){
               if(link_data[i].source in node_data && link_data[i].target in node_data) {
                   link_data_array.push(link_data[i]);
               }
           }//get link array

         // console.log(node_data_array,link_data_array);

         // out_data["statistic_birthyear"]=sta_birthyear;
         // out_data["statistic_scorelevel"]=sta_scorelevel;
         // out_data["statistic_marriage"]=sta_marriage;
         // out_data["statistic_gender"]=sta_gender;
         out_data["node"]=node_data_array;
         out_data["link"]=link_data_array;

     return out_data;

}

function calc_nodes(msg) {
    var node_data = {};
    var win = [];
    // console.log (i)
    for (var i=0; i<msg.length; i++){
        win[i]= prenode[msg[i]];
        var arr = Object.keys(win[i]);
        for (var j=0; j<arr.length; j++){
            node_data[arr[j]]= win[i][arr[j]];
            // node_data.push(win[i][j])
        }
    }
    var arr_node =Object.keys(node_data);
    var node_data_array =[];
    for (var i in node_data){
        node_data[i]['name'] = node_data[i].userid;
        node_data_array.push(node_data[i]);
    }
    return node_data_array;
}

// ====== birthyear_stt(out_data_json.node)=======
function birthyer_sts(msg){
    var node_data_array = calc_nodes(msg);
    // =======sta.birthyer=====
    var num_1=0;
    var num_2=0;
    var num_3=0;
    var num_4=0;
    var sta_birthyear = [];
    for (var i =0; i<node_data_array.length;i++){
        if(node_data_array[i].birthyear==1991){
            num_1++;
        }else if(node_data_array[i].birthyear==1992){
            num_2++;
        }else if(node_data_array[i].birthyear==1993){
            num_3++;
        }else if(node_data_array[i].birthyear==1994){
            num_4++;
        }
    }
    sta_birthyear.push({"x": "1991", "y": num_1 });
    sta_birthyear.push({"x": "1992", "y": num_2 });
    sta_birthyear.push({"x": "1993", "y": num_3 });
    sta_birthyear.push({"x": "1994", "y": num_4 });
    return sta_birthyear;
}
function gender_sts(msg){
    var node_data_array = calc_nodes(msg);

    // =====sta.gender========
    var num_w=0;
    var num_m=0;
    var sta_gender = [];
    for (var i =0; i<node_data_array.length;i++){
        if(node_data_array[i].gender==1){
            num_m++;
        }else if(node_data_array[i].gender==2){
            num_w++;
        }
    }
    sta_gender.push({'x': "Woman", 'y': num_w});
    sta_gender.push({'x': "Man", 'y': num_m});

    return sta_gender;
}
function marriage_sts(msg){
    var node_data_array = calc_nodes(msg);
    // =======sta.marriage=====
    var num_y=0;
    var num_n=0;
    var sta_marriage = [];
    for (var i =0; i<node_data_array.length;i++){
        if(node_data_array[i].marriage==1){
            num_y++;
        }else if(node_data_array[i].marriage==2){
            num_n++;
        }
    }
    sta_marriage.push({'x': "Marriage", 'y': num_y});
    sta_marriage.push({'x': "Single", 'y': num_n});
    return sta_marriage;
}
function scorelevel_sts(msg){
    var node_data_array = calc_nodes(msg);
  // =======sta.scorelevel=====
    var num_1=0;
    var num_2=0;
    var num_3=0;
    var num_4=0;
    var sta_scorelevel = [];
    for (var i =0; i<node_data_array.length;i++){
        if(node_data_array[i].scorelevel==1){
            num_1++;
        }else if(node_data_array[i].scorelevel==2){
            num_2++;
        }else if(node_data_array[i].scorelevel==3){
            num_3++;
        }else if(node_data_array[i].scorelevel==4){
            num_4++;
        }
    }
    sta_scorelevel.push({'x': "Level 1", 'y': num_1});
    sta_scorelevel.push({'x': "Level 2", 'y': num_2});
    sta_scorelevel.push({'x': "Level 3", 'y': num_3});
    sta_scorelevel.push({'x': "Level 4", 'y': num_4});
    return sta_scorelevel;
}
