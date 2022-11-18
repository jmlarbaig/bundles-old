const athletes_init = {
    "lane": 0,
    "displayName": "",
    "rank": 0,
    "overallPoints": 0,
    "age": 0,
    "heigth": 0,
    "weight": 0,
    "affiliate": "",
    "division": "",
    "status":"",
    "CurrentRank": 0,
    "score_abs": 0,
    "score_rel": 0,
    "currentRound": 0,
    "tieBreak": "",
    "result": "",
    "currentMouvement": [
        {
            "mouvementName": "0",
            "nextMouvement": "",
            "repTarget": 0,
            "rep/min": 0,
            "power": 0,
            "cal_h": 0,
            "s/m": 0
        }
    ],
    "Log_mvt_time": [
        {
        }
    ],
    "Log_serie_time": [
        {
        }
    ],
    "Log_round_time": [
        {}
    ],
    "countryCode": "",
    "benchmark": [
      {
        "ForTime": {
          "fran": "",
          "helen": "",
          "grace": "",
          "filthy": "",
          "sprint400m": "",
          "run5k": "",
          "twoKRow": "",
          "fightgonebad": "",
          "cleanJerk": "",
          "deadlift": "",
          "crossfitTotal": 0,
          "snatch": "",
          "backSquat": ""
        }
      }
    ]
}

var affiliateTimer = undefined
var repTobeat = 0;
var typeWod_G = undefined
var rd = []

var athletes = {}

var currentMvt = undefined;
var LastlengthStats = [];

function ascendingRank(a, b) { return Number(a.CurrentRank) - Number(b.CurrentRank) }
function descendingRank(a, b) { return Number(a.CurrentRank) + Number(b.CurrentRank) }
function ascendingLane(a, b) { return Number(a.lane) - Number(b.lane) }
function descendingLane(a, b) { return Number(a.lane) + Number(b.lane) }

function reposition(WhichLeadeboard, athletes) {
    var height = $(WhichLeadeboard + " #athletes .athlete").height();
    var y = height ;
    Object.keys(athletes).forEach(key => {
        if(athletes[key].$item.find(WhichLeadeboard) != undefined){   
            athletes[key].$item.css("top", y + "px");
            y += height;			
        }
    })
}  

function fetchNewData(data,lane){
    for(var x in data){
        if((data[x].lane == lane) == true) {
            return data[x];
        }
    }
    return null;
}


function mvtIndexForTime(nbrReps, division){
    console.log("FOR TIMENbr De reps = ", nbrReps, " & Division = ", division)
    let res = nbrReps;
    let index = 0;
    let mvt;
    let repTarget;
    let id;
    for (let wod of workout){
        if (wod.division == division ){
            if(res !=0){
                console.log("RepTarget= ", wod.mvt_reps[0])
                if( res == wod.total_reps && wod.mvt_names[wod.mvt_names.length-1] == "Sprint"){
                    res = 0
                    index = wod.mvt_names.length-1
                }
                else {
                    while(res >= 0){
                        res =  (res - wod.mvt_reps[index])
                        // console.log("je suis à l'index : ", index)
                        index++;
                    }
                    // console.log("je suis à l'index =", index-1 ," et l'id : ",wod.mvt_id[index-1], " donc ", wod.mvt_reps[index-1], wod.mvt_names[index-1])
                    index = index -1;
                }
            }
            else {
                index = 0
                res = -wod.mvt_reps[index];
            }
            return( {'scoreAbsMvt':wod.mvt_reps[index] + res,'scoreRelMvt':res,'id':wod.mvt_id[index],'repTarget':wod.mvt_reps[index],'mvtNames':wod.mvt_names[index]})
        }
    }
}

function mvtIndexAmrap(nbrReps, division, rounds){
    console.log("AMRAP Nbr De reps = ", nbrReps, " & Division = ", division)
    let res = nbrReps;
    let index = 0;
    let mvt;
    let repTarget;
    let id;
    for (let wod of workout){
        if (wod.division == division ){
            if(nbrReps !=0){
                if (wod.mvt_reps[index] != 0 ){
                    if (rounds > 1){
                        nbrReps = nbrReps - (wod.total_reps*(rounds-1))
                        var res_seuil = nbrReps
                        console.log(nbrReps)
                    }
                    if (nbrReps <= wod.mvt_reps[index] && rounds > 1){
                        index = 0
                    }
                    while(nbrReps >= 0){
                        nbrReps =  (nbrReps - wod.mvt_reps[index])
                        // console.log("je suis à l'index : ", index)
                        index++;
                    }
                    res = nbrReps
                    var res2 = res
                    // console.log("je suis à l'index =", index-1 ," et l'id : ",wod.mvt_id[index-1], " donc ", wod.mvt_reps[index-1], wod.mvt_names[index-1])
                    index = index -1;
                    repTarget = wod.mvt_reps[index]
                }
                else{
                    res2 != undefined ? res = nbrReps - res2 : res = (nbrReps - (wod.total_reps*rounds))
                    index = wod.mvt_reps.length -1
                    repTarget = 'MAX'
                    console.log("MAX : ", nbrReps)
                    console.log("MAX index : ", index)
                }
    
            }
            else {
                index = 0
                res = -wod.mvt_reps[index];
                if (wod.mvt_reps[index] == 0 ){
                    repTarget = 'MAX'
                }else{
                    repTarget = wod.mvt_reps[index]
                }
                if(rounds != 1){
                    rounds = 0
                    console.log('test')
                }
            }
            return( {'scoreAbsMvt':wod.mvt_reps[index] + res,'scoreRelMvt':res_seuil,'id':wod.mvt_id[index],'repTarget':repTarget,'mvtNames':wod.mvt_names[index], 'rounds':rounds, 'totalReps': wod.total_reps})
        }
    }
}

let Mvt_name = [];
var workout = [];


function updateDynamics(newScoring, status){
    try{

        console.log("Show manual ",showManuel.value)
        if (!showManuel.value){
            
            Object.keys(athletes).forEach(i => {    
            console.log("Athlete = ", athletes[i])
            console.log("i =", i)

            athletes[i] = Object.assign( {}, athletes[i],fetchNewData(newScoring, athletes[i].lane));
            // athletes[i].$item.find(".rank").text(athletes[i].CurrentRank);
            

            // if(athletes[i].currentMouvement[0].mouvementName != athletes[i].$item.find(".popup").text() && status == "W" ){
            if( status == "W" ){

                // athletes[i].$item.find(".lane").hide();
                if(workout.length > 0 && athletes[i].result == ""){
                        
                    // ID[lane] = mvtIndex(athletes[i].score_abs, athletes[i].division)
                    Mvt_name[athletes[i].lane] = typeWod_G != "amrap" ? mvtIndexForTime(athletes[i].score_abs, athletes[i].division) : mvtIndexAmrap(athletes[i].score_abs, athletes[i].division, athletes[i].log_round_time[0].length +1)
                    console.log(Mvt_name[athletes[i].lane])


                    if ( Mvt_name[athletes[i].lane].mvtNames.includes("_")){
                        Mvt_name[athletes[i].lane].mvtNames = Mvt_name[athletes[i].lane].mvtNames.replaceAll("_", " ")
                    }

                    if ( Mvt_name[athletes[i].lane].mvtNames.includes("Sprint")){
                        athletes[i].$item.find(".popup").text( Mvt_name[athletes[i].lane].mvtNames);
                        athletes[i].$item.find(".score").text("Sprint");
                        athletes[i].$item.find(".popup").fadeIn();
                    }
                    else{
                        var char = athletes[i].score_abs;

                        athletes[i].$item.find(".score").text(char =! 0 ? char +' REPS' : '')

                        // athletes[i].$item.find(".popup").text(Mvt_name[athletes[i].lane].mvtNames);
                        athletes[i].$item.find(".mvt").text(Mvt_name[athletes[i].lane].scoreAbsMvt + "/" + Mvt_name[athletes[i].lane].repTarget + ' ' + Mvt_name[athletes[i].lane].mvtNames);
                        
                    }
                }
                else{
                    athletes[i].$item.find(".score").text(athletes[i].score_abs)
                    athletes[i].$item.find(".mvt").text('');
                }

                if(dataRow.value[i] != undefined && athletes[i].currentMouvement[0].mouvementName.includes("Row")){
                        console.log(dataRow)
                        athletes[i].$itemRow.find(".dataRow").text(parseInt(dataRow.value[i].distance).toString() + " M" + " - " + parseInt(dataRow.value[i].spm).toString() + " S/M");
                }
            }



                if(athletes[i].result == "" ){
                    if (athletes[i].CurrentRank == 1){
                        athletes[i].$item.find(".score").css("color", tx_first_rank__color )
                        athletes[i].$item.find(".score").css("background", first_rank__color )
                        // athletes[i].$item.find(".score").text(athletes[i].score_abs);
                    }
                    else if (athletes[i].CurrentRank == 2){
                        athletes[i].$item.find(".score").css("color", tx_second_rank__color )
                        athletes[i].$item.find(".score").css("background", second_rank__color)
                    }
                    else if (athletes[i].CurrentRank == 3){
                        athletes[i].$item.find(".score").css("color", tx_third_rank__color )
                        athletes[i].$item.find(".score").css("background", third_rank__color)
                    }
                    else {
                        athletes[i].$item.find(".score").css("background", second_color )
                        athletes[i].$item.find(".score").css("color", tx_second_color )
                    }
                }
                else{
                    athletes[i].$item.find(".score").css("background", finish__color)
                    athletes[i].$item.find(".score").css("color", tx_finish__color)
                    var result = athletes[i].result;
                    if (athletes[i].status == "F"){
                        athletes[i].$item.find(".score").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
                    }
                    else if (athletes[i].status == "T"){
                        athletes[i].$item.find(".score").text(result.toString());
                    }
                }

            })
            

            console.log(athletes)

            if(status != "0" || athletes[1].CurrentRank == null){
                console.log(athletes)
            }
            else{
                clearInterval(affiliateTimer)
            }
        }
        else {
            console.log("Show value true")
            for (let i = 0; i < newScoring.length; i++) {                
                // athletes[i].$item.find(".rank").text("");
                
            }

        }
    }
    catch(e){
        console.log(e)
    }
}    

function resetLeaderboard(laneLeft, LaneRigth){
    try{
        LastlengthStats = [];

        var data = staticData;
        console.log("Static Data = ", staticData)
        // ! On prend le tableau
        
        var $tab = $("#overlay")
        $tab.find(".leaderboard").remove();

        //! on traite le wod en cours 

        typeWod_G = data.heatInfo[0].type;


        athletes_divison = []

        // ! On récupère toutes les divisions présentes dans la heat en cours

        var divisionsNames = []
        var repTarget = [];


        for(let athletes of data.athletes){
            if( !divisionsNames.includes(athletes.division) ){
                divisionsNames.push(athletes.division)
            }
        }
        
        //! on retient le rep targets

        for(let y=0; y < divisionsNames.length; y++){
            for(let wod of data.WorkoutInfo){
                if(divisionsNames[y] == wod.division){
                    repTarget[y] = wod.total_reps
                    workout[y] = wod;
                }
            }
        }


        // if (data.heatInfo[0].type == "time"){
        //     var typeWod = "";
        //     for(let i=0; i< data.WorkoutInfo[0]; i++){
        //         repTarget[i] = data.WorkoutInfo[i].total_reps;
        //     }
        // }
        // else if (data.heatInfo[0].type == "amrap"){
        //     var typeWod = "BEAT"
        //     var repTarget = "MAX REPS" ;
        // }

        //! Initialisation des athletes dans un seul format avec un triage par division

        athletes = new Array();
        for(let i = 0;i < data.athletes.length;i++){
            athletes[i] = athletes_init;
            athletes[i] = Object.assign({}, athletes[i], data.athletes[i])
            if (athletes[i].countryCode == "" || athletes[i].countryCode==null){athletes[i].countryCode = "FR"}
            else{
                for(let f=0; f < FLAG.length; f++){
                    if (athletes[i].countryCode == FLAG[f]["3L"]){
                        athletes[i].countryCode = FLAG[f]["2L"];
                        break;
                    }
                }
            }
        }

        // ! On crée un tableau par division

        var $elm = $("#overlay");
        $elm.find(".laneLeft").remove();
        $elm.find(".laneRight").remove();
        $elm.find(".chrono").remove();

        var $tabItem = $(
            '<div class="laneLeft col" id="laneLeft">'+'</div>' +
            '<div class="chrono col" id="chrono"></div>' +
            '<div class="laneRight col" id="laneRight">'+'</div>' 
        );

        $elm.append($tabItem);

        var $list = $(".chrono");
        $list.find(".time").remove();

        var $itemChrono = $(
            '<div class="time">' +
                '<div id="eventName" class="eventName text-center m-auto ">'+ data.workoutName +'</div>' +
                '<div id="chronoText" class="text-nowrap text-truncate chronoText text-center"> TIME</div>' +
                '<div id="timecap" class="timecap text-center m-auto ">'+ timecapNTP +"' CAP</div>" +
            '</div>'+ 
            '<div class="mainSponsor"></div>' 
        );

        $list.append($itemChrono);

        if(mainSponsors.value.length > 0){
            $(".mainSponsor").css("background-image", "url(" + mainSponsors.value[0].url + ")");
        }

        Object.keys(athletes).forEach(key => {
            var $item = $(
                '<div class="cont row">' + 
                    '<div class="triangle">' + '</div>' +
                    '<div class="athlete row">' +
                        '<div class="text-nowrap text-truncate text-left name">' + athletes[key].displayName + '</div>' + 
                        '<div class="scoreDiv">'+
                            '<div class="score text-nowrap text-truncate"></div>' +
                            '<div class="mvt text-nowrap text-truncate"></div>' +
                        '</div>' +
                        // '<div class="text-nowrap text-truncate popup">' + '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="events'+ athletes[key].lane +' events row">' + 
                // '</div>' +
                // '<div class="popup row">' +
                //     '<td class="rowStats"></td>' +
                '</div>' 
            );
            athletes[key].$item = $item;
            // athletes[key].$item.find(".rowStats").hide();
        })

        var $elm1 = $(".laneLeft");
        $elm1.find(".athlete").remove();
        var $itemLeft = athletes[laneLeft].$item;
        $elm1.append($itemLeft);

        var $elm2 = $(".laneRight");
        $elm2.find(".laneRight").remove();
        var $itemRigth = athletes[LaneRigth].$item
        $elm2.append($itemRigth);


        console.log('Table ',tableEvent)
        if(tableEvent.length>0){
            createEvents(tableEvent)
        }
        if(eventWin.length>0){
            updateEvent(eventWin)
        }


        var $elm = $("#overlayRow");
        $elm.find(".athleteRow").remove();

        Object.keys(athletes).forEach(key => {
            var $itemRow = $(
                '<div class="athleteRow row">' +
                    '<div class="text-nowrap text-truncate text-left name">' + athletes[key].displayName + '</div>' + 
                    '<div class="dataRow text-nowrap text-truncate">0 M - 0:00 S/M</div>' +
                '</div>' 
            );
            athletes[key].$itemRow = $itemRow;
            $elm.append($itemRow);
        })

        if(!ShowRow.value){
            $("#overlayRow").hide()
        }

    }
    catch(e){
        console.log(e)
    }
}
