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
var rep_rounds = []

var athletes_divison = {}

var currentMvt = undefined;

function ascendingRank(a, b) { return Number(a.CurrentRank) - Number(b.CurrentRank) }
function descendingRank(a, b) { return Number(a.CurrentRank) + Number(b.CurrentRank) }
function ascendingLane(a, b) { return Number(a.lane) - Number(b.lane) }
function descendingLane(a, b) { return Number(a.lane) + Number(b.lane) }


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
                if (wod.mvt_reps[index] != 0 && wod.total_reps>nbrReps){
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
var newStats = []

function updateDynamics(newScoring, status){
    try{

        // console.log("New Scoring",newScoring)

        Object.keys(athletes_divison).forEach(key => {
            // console.log(athletes_divison[key])
            
            Object.keys(athletes_divison[key]).forEach(i => {

                athletes_divison[key][i] = Object.assign( {}, athletes_divison[key][i],fetchNewData(newScoring, athletes_divison[key][i].lane));
                athletes_divison[key][i].$item.find(".rank").text(athletes_divison[key][i].CurrentRank);


                // Mvt_name[athletes_divison[key][i].lane] = typeWod_G != "amrap" ? mvtIndexForTime(athletes_divison[key][i].score_abs, athletes_divison[key][i].division) : mvtIndexAmrap(athletes_divison[key][i].score_abs, athletes_divison[key][i].division, athletes_divison[key][i].currentRound)
                // console.log(Mvt_name)
                
                

                if( status == "W" ){
                    if(workout.length > 0){
                            

                        // athletes_divison[key][i].$item.find(".lane").hide();
                        // ID[lane] = mvtIndex(athletes_divison[key][i].score_abs, athletes_divison[key][i].division)
                        Mvt_name[athletes_divison[key][i].lane] = typeWod_G != "amrap" ? mvtIndexForTime(athletes_divison[key][i].score_abs, athletes_divison[key][i].division) : mvtIndexAmrap(athletes_divison[key][i].score_abs, athletes_divison[key][i].division, athletes_divison[key][i].log_round_time[0].length +1)
                        console.log(Mvt_name)


                        if ( Mvt_name[athletes_divison[key][i].lane].mvtNames.includes("_")){
                            Mvt_name[athletes_divison[key][i].lane].mvtNames = Mvt_name[athletes_divison[key][i].lane].mvtNames.replaceAll("_", " ")
                        }

                        if ( Mvt_name[athletes_divison[key][i].lane].mvtNames.includes("Sprint")){
                            athletes_divison[key][i].$item.find(".mvt").text( Mvt_name[athletes_divison[key][i].lane].mvtNames);
                            athletes_divison[key][i].$item.find(".score").text("");
                        }
                        else{
                            if (typeWod_G == 'amrap'){

                                var percent = (Mvt_name[athletes_divison[key][i].lane].scoreRelMvt / Mvt_name[athletes_divison[key][i].lane].totalReps)*95

                                athletes_divison[key][i].$item.find(".rounds").show();
                                athletes_divison[key][i].$item.find(".rounds").text("R"+(Mvt_name[athletes_divison[key][i].lane].rounds));
                                athletes_divison[key][i].$item.find(".mvt").text(Mvt_name[athletes_divison[key][i].lane].mvtNames);
                                athletes_divison[key][i].$item.find(".score").text(Mvt_name[athletes_divison[key][i].lane].scoreAbsMvt + "/" + Mvt_name[athletes_divison[key][i].lane].repTarget);

                                if(Mvt_name[athletes_divison[key][i].lane].mvtNames == "" || Mvt_name[athletes_divison[key][i].lane].mvtNames.includes("Workout")){
                                }
                                else{
                                    athletes_divison[key][i].$item.find(".mvt").text(Mvt_name[athletes_divison[key][i].lane].mvtNames);
                                    athletes_divison[key][i].$item.find(".score").text(Mvt_name[athletes_divison[key][i].lane].scoreAbsMvt + "/" + Mvt_name[athletes_divison[key][i].lane].repTarget);
                                }

                                Object.values(athletes_divison[key][i].log_mvt[0]).forEach((time, index)=>{
                                    // newStats[athletes_divison[key][i].lane][index] = time
                                    athletes_divison[key][i].$item.find(".mvt_id"+index).text(time)
                                })
                                
                            }
                            else {

                                var percent = (athletes_divison[key][i].score_abs / totalRep[key])*95
                                athletes_divison[key][i].$item.find(".rounds").hide();
                                athletes_divison[key][i].$item.find(".mvt").text(Mvt_name[athletes_divison[key][i].lane].mvtNames);
                                athletes_divison[key][i].$item.find(".score").text(Mvt_name[athletes_divison[key][i].lane].scoreAbsMvt + "/" + Mvt_name[athletes_divison[key][i].lane].repTarget);

                                // console.log(athletes_divison[key][i].log_mvt[0])
                                // if (newStats[athletes_divison[key][i].lane] == null){
                                //     newStats[athletes_divison[key][i].lane] = []
                                    Object.values(athletes_divison[key][i].log_mvt[0]).forEach((time, index)=>{
                                        // newStats[athletes_divison[key][i].lane][index] = time
                                        athletes_divison[key][i].$item.find(".mvt_id"+index).text(time)
                                    })
                                    // console.log("new Stats = ", newStats)
                                    // athletes_divison[key][i].$item.find(".mvt_id"+Mvt_name[athletes_divison[key][i].lane].id).text(Object.values(athletes_divison[key][i].log_mvt[0])[Mvt_name[athletes_divison[key][i].lane].id])
                                // }else{
                                //     if (Object.values(athletes_divison[key][i].log_mvt[0]).length > newStats[athletes_divison[key][i].lane].length){
                                //         var derniere = Object.values(athletes_divison[key][i].log_mvt[0]).length - 1
                                //         newStats[athletes_divison[key][i].lane][derniere] = Object.values(athletes_divison[key][i].log_mvt[0])[derniere]
                                //         athletes_divison[key][i].$item.find(".mvt_id"+derniere).text(Object.values(athletes_divison[key][i].log_mvt[0])[derniere])
                                //     }
                                // }

                            }
                            
                        }

                        // if(document.getElementById(athletes_divison[key][i].lane) != null ){
                        //     document.getElementById(athletes_divison[key][i].lane).style.transform="translateX("+ percent +"%)";
                        // }
                    }
                    else{
                        athletes_divison[key][i].$item.find(".score").text(athletes_divison[key][i].score_abs)
                    }


                }

                


                if(athletes_divison[key][i].result == "" ){
                    athletes_divison[key][i].$item.find(".score").css("width", "200px")
                    athletes_divison[key][i].$item.find(".score").css("max-width", "200px")
                    if (athletes_divison[key][i].CurrentRank == 1){
                        athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + first_rank__color + ")")
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + first_rank__color + ")")
                        athletes_divison[key][i].$item.find(".rank").css("color", tx_first_rank__color)
                        athletes_divison[key][i].$item.find(".score").css("color", tx_first_rank__color)
                        athletes_divison[key][i].$item.find(".circle").css("fill", first_rank__color)
                    }
                    else if (athletes_divison[key][i].CurrentRank == 2){
                        athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + second_rank__color + ")")
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + second_rank__color + ")")
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + second_rank__color + ")")
                        athletes_divison[key][i].$item.find(".rank").css("color", tx_second_rank__color)
                        athletes_divison[key][i].$item.find(".score").css("color", tx_second_rank__color)
                        athletes_divison[key][i].$item.find(".circle").css("fill", second_rank__color)
                    }
                    else if (athletes_divison[key][i].CurrentRank == 3){
                        athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + third_rank__color + ")")
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + third_rank__color + ")")
                        athletes_divison[key][i].$item.find(".rank").css("color", tx_third_rank__color)
                        athletes_divison[key][i].$item.find(".score").css("color", tx_third_rank__color)
                        athletes_divison[key][i].$item.find(".circle").css("fill", third_rank__color)
                    }
                    else {
                        athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + second_color + ")")
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + second_color + ")")
                        athletes_divison[key][i].$item.find(".rank").css("color", tx_second_color)
                        athletes_divison[key][i].$item.find(".score").css("color", tx_second_color)
                        athletes_divison[key][i].$item.find(".circle").css("fill", second_color)
                    }
                }
                else{
                    athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right," + main_color + "," + finish__color + ")")
                    athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + finish__color + ")")
                    athletes_divison[key][i].$item.find(".circle").css("fill",finish__color)
                    athletes_divison[key][i].$item.find(".score").css("color", tx_finish__color)
                    athletes_divison[key][i].$item.find(".rank").css("color", tx_finish__color)
                    athletes_divison[key][i].$item.find(".score").css("width", "200px")
                    athletes_divison[key][i].$item.find(".score").css("max-width", "200px")
                    var result = athletes_divison[key][i].result;
                    if (athletes_divison[key][i].status == "F"){
                        console.log(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result : "")
                        athletes_divison[key][i].$item.find(".score").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
                    }
                    else if (athletes_divison[key][i].status == "T"){
                        athletes_divison[key][i].$item.find(".score").text(result.toString());
                    }
                }

            })

            console.log(athletes_divison[key])

            if(status != "0"){
            }
            else{
                clearInterval(affiliateTimer)
            }
            // newStats.forEach((leaderboard, index) => {
            //     console.log("leaderboard ", leaderboard)
            // })
        })
    }
    catch(e){
        console.log(e)
    }
}    

var mvtDescription = []

function resetProgress(data){
    try{

        Mvt_name = [];
        workout = [];
        newStats = []

        // console.log(data)

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

        console.log("Division Names",divisionsNames)

        //! on retient le rep targets

        for(let y=0; y < divisionsNames.length; y++){
            for(let wod of data.WorkoutInfo){
                if(divisionsNames[y] == wod.division){
                    console.log("wod.rep_per_rounds = ", wod)
                    repTarget[y] = wod.total_reps
                    totalRep[y] = wod.total_reps;
                    workout[y] = wod;
                    console.log("workout : ", workout[y])
                    if (typeWod_G =="amrap"){
                        rep_rounds[y] = wod.rep_per_rounds;
                    }
                    else {
                        if (wod.total_reps == undefined){
                            rep_rounds[y] = "Max de rep";
                        }
                        else{
                            rep_rounds[y] = wod.total_reps;
                        }
                    }
                }
            }
        }

        //! On retient tous les mouvements pour chaque division
        var WodInfos = data.WorkoutInfo
        var mvtNames_final = []

        for(let y=0; y < divisionsNames.length; y++){
            for(let ii = 0; ii < WodInfos.length ; ii ++){
                var mvtNames = []
                if (WodInfos[ii].division == divisionsNames[y]){
                    for (let i = 0; i < WodInfos[ii].mvt_names.length; i++) {
                        if( WodInfos[ii].mvt_names[i].charAt(0) <='9' && WodInfos[ii].mvt_names[i].charAt(0) >='0') {
                            mvtNames[i] = WodInfos[ii].mvt_names[i]; 
                        }
                        else {
                            mvtNames[i] = WodInfos[ii].mvt_reps[i] + " " + WodInfos[ii].mvt_names[i]; 
                        }
                        // console.log(mvtNames[i])
                        // console.log(mvtNames[i].includes("Sprint"))
                        if( mvtNames[i].includes("Sprint")){
                            mvtNames[i] = mvtNames[i].substring(1)
                        }
                    }
                    for (let i = 0; i < WodInfos[ii].mvt_names.length; i++) {
                        mvtNames = mvtNames.toString().toUpperCase().replace(',',' - ')
                    }
                    mvtNames_final[y]=mvtNames
                }
            }
        }

        // console.log(divisionsNames)
        // console.log(repTarget)


        // if (data.heatInfo[0].type == "time"){
        //     var typeWod = "";
        //     for(i=0; i< data.WorkoutInfo[0]; i++){
        //         repTarget[i] = data.WorkoutInfo[i].total_reps + " reps" ;
        //         totalRep[i] = data.WorkoutInfo[i].total_reps;
        //     }
        // }
        // else if (data.heatInfo[0].type == "amrap"){
        //     var typeWod = "BEAT"
        //     var repTarget = data.WorkoutInfo[0].total_reps + " reps" ;
        //     totalRep[i] = data.WorkoutInfo[i].total_reps;
        // }


        console.log(divisionsNames)

        //! Initialisation des athletes dans un seul format avec un triage par division

        for (var y = 0; y < divisionsNames.length; y++){
            athletes = new Array();
            for(let i = 0;i < data.athletes.length;i++){
                if(data.athletes[i].division == divisionsNames[y]){
                    athletes[i] = athletes_init;
                    athletes[i] = Object.assign({}, athletes[i], data.athletes[i])
                    if (athletes[i].countryCode=="" || athletes[i].countryCode==null){
                        athletes[i].countryCode = "FR"
                    }
                    else{
                        for(let f=0; f < FLAG.length; f++){
                            if (athletes[i].countryCode == FLAG[f]["3L"]){
                                athletes[i].countryCode = FLAG[f]["2L"];
                                break;
                            }
                        }
                    }
                }
            }
            athletes_divison[y] = athletes
        }

        // ! On crée un tableau par division

        // ! On prend le tableau

        var $tab = $("#tableHeader")
        $tab.find(".global").remove();

        // var heatDetails;
        // for (var y = 0; y < Object.keys(athletes_divison).length; y++){
        Object.keys(athletes_divison).forEach(key => {
            //! Ajouter la séparation ici
            if(typeWod_G == "amrap"){
                var textRep = "AMRAP"
            }
            else {
                if(repTarget[key] == undefined){
                    var textRep = "Max reps";
                }
                else{
                    var textRep = repTarget[key] + " REPS";
                }
            }
            if(mvtNames_final[key] == undefined){
                var textMvt = "";
            }
            else{
                var textMvt = mvtNames_final[key];
            }
            if ( data.WorkoutInfo.length > 0){
                mvtDescription[key] = data.WorkoutInfo[key].description.replaceAll('<p>', '  ') ;
                mvtDescription[key] = mvtDescription[key].replaceAll('</p>',' ')
                mvtDescription[key] = mvtDescription[key].replaceAll('_',' ')
            }
            else{
                mvtDescription[key] = ''
            }

            var $tabItem = $(
                '<div class="global">' +
                    '<div class="wodrow row text-center d-xl-flex align-items-xl-center">'+ 
                        '<div class="col-2" id="logoProgress">' +
                            '<img class="logoEvent img-fluid"/>' + 
                        '</div>' +
                        '<div class="col-2 division">'+
                            divisionsNames[key] + " division" +
                        '</div>' +
                        '<div class="col-6">'+
                            mvtDescription[key] + 
                        '</div>' +
                        '<div class="col target">'+
                            '<div class="row teamTarget'+ [key]+'"/>'+
                            '<div class="row repTarget'+ [key]+'" >'+
                                textRep + 
                            '</div>' +
                        '</div>'+
                    '</div>' +
                    '<div class="leaderboard">' + 
                        '<div class="athlete">' + 
                            '<div class="lane">RANK</div>' + 
                            // '<div class="flag">FLAG</div>' +
                            '<div class="text-nowrap text-truncate text-left name">NAME</div>' + 
                            '<div class="text-nowrap text-truncate text-left affiliate">AFFILIATE</div>' +
                            '<div class="Orank">O. Points</div>' + 
                            '<div class="Orank">O. Rank</div>' +
                            '<div class="rank">Rank</div>' + 
                            '<div class="stats_header header'+key+'">' + 
                                
                            '</div>'+
                            // '<div class="circle_progress">' +
                            //     '<svg>' +
                            //         '<circle cx="10" cy="50%" r="5px" fill="#aeaeae" class="circle" id="' + athletes_divison[key][i].lane+'"/>' +
                            //     '</svg>' +
                            // '</div>' +
                            '<div class="rounds text-nowrap text-truncate">Rounds</div>' + 
                            '<div class="score align-items-xl-center">Scores</div>' +
                            '<div class="mvt text-nowrap text-truncate">Mouvement</div>' + 
                        '</div>'+
                    '</div>'+
                    '<div id="leaderboard'+ key +'" class="leaderboard">' +
                    '</div>' +
                '</div>' 
            );

            // heatDetails.$tabItem = $tabItem;
            $tab.append($tabItem);
            $tabItem.find(".rounds").hide()

            var $stat_header = $('.header'+key);
            $stat_header.find("div").remove();
            if(workout.length >0){
                workout[key].mvt_id.forEach((id, index)=> {
                    console.log(workout[key].mvt_names[index])
                    var $item_header = $(
                        '<div class="mvt_name text-nowrap text-truncate">'+workout[key].mvt_reps[index]+ ' ' +workout[key].mvt_names[index]+' </div>'
                        // '<div class="mvt_id'+id+' "></div>'
                    )
                    $stat_header.append($item_header);
                })
            }
            else{
                var $item_header = $(
                    '<div class="mvt_name text-nowrap text-truncate"></div>'
                )
                $stat_header.append($item_header);
            }



            var $list = $("#leaderboard"+ key);
            $list.find(".athlete").remove();
            $list.find(".stats").remove();

            athletes_divison[key].sort(descendingLane);

            // for(var i = 0; i < athletes_divison[key].length; i++) {
            Object.keys(athletes_divison[key]).forEach(i => {
                console.log(athletes_divison[key])
                var affiliate_team =  athletes_divison[key][i].affiliate != undefined ?  athletes_divison[key][i].affiliate : '-'
                var $item = $(
                    '<div class="athlete">' + 
                        '<div class="lane">'+ athletes_divison[key][i].lane + '</div>' + 
                        // '<div class="flag">' + '<img src="https://flagcdn.com/'+ athletes_divison[key][i].countryCode.toLowerCase() + '.svg" width="30"></img> ' + '</div>' +
                        '<div class="text-nowrap text-truncate text-left name">' + athletes_divison[key][i].displayName + '</div>' + 
                        '<div class="text-nowrap text-truncate text-left affiliate">' +affiliate_team + '</div>' +
                        '<div class="Orank">' + athletes_divison[key][i].overallPoints + '</div>' + 
                        '<div class="Orank">' + athletes_divison[key][i].rank + '</div>' +
                        '<div class="rank">' + athletes_divison[key][i].CurrentRank  + '</div>' + 
                        '<div class=" stats athlete_stats_'+athletes_divison[key][i].lane+'">' + 
                            
                        '</div>'+
                        // '<div class="circle_progress">' +
                        //     '<svg>' +
                        //         '<circle cx="10" cy="50%" r="5px" fill="#aeaeae" class="circle" id="' + athletes_divison[key][i].lane+'"/>' +
                        //     '</svg>' +
                        // '</div>' +
                        '<div class="rounds text-nowrap text-truncate"></div>' + 
                        '<div class="score align-items-xl-center">' + athletes_divison[key][i].score_abs + '</div>' +
                        '<div class="mvt text-nowrap text-truncate">' + athletes_divison[key][i].currentMouvement[0].mouvementName  + '</div>' + 
                    '</div>'
                );


                athletes_divison[key][i].$item = $item;
                athletes_divison[key][i].$item.find(".rounds").hide()
                $list.append($item);

                var $stat = $('.athlete_stats_'+athletes_divison[key][i].lane);
                $stat.find("div").remove();

                console.log('workout ', workout.length)
                if(workout.length > 0){
                    workout[key].mvt_id.forEach((id, index)=> {
                        console.log(workout[key].mvt_names[index])
                        var $item = $(
                            // '<div class="mvt_name text-nowrap text-truncate">'+workout[key].mvt_reps[index]+ ' ' +workout[key].mvt_names[index]+' </div>'+
                            '<div class="mvt_id'+id+'" id="'+ id +'_'+ athletes_divison[key][i].lane +'" onclick="toggleStats()"></div>'
                        )
                        $stat.append($item);
    
                    })
                }
                else{
                    var $item = $(
                        // '<div class="mvt_name text-nowrap text-truncate">'+workout[key].mvt_reps[index]+ ' ' +workout[key].mvt_names[index]+' </div>'+
                        '<div></div>'
                    )
                    $stat.append($item);
                }


            })
                athletes_divison[key].sort(ascendingLane);

        })
    }
    catch(e){
        console.log(e)
    }
}

function toggleStats(){
    let element = event.target.id
    let color = $(".global").find("#"+element).css('background-color')
    console.log("element : ",  color)
    if( color != "rgb(0, 128, 0)"){
        $(".global").find("#"+element).css("background-color","green")
        $(".global").find("#"+element).css("color","white")
    }
    else{
        $(".global").find("#"+element).css("background-color","white")
        $(".global").find("#"+element).css("color","black")
    }
}