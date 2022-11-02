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
var workout = [];

var athletes_divison = {}

var currentMvt = undefined;

var mvtDescription = []

function ascendingRank(a, b) { return Number(a.CurrentRank) - Number(b.CurrentRank) }
function descendingRank(a, b) { return Number(a.CurrentRank) + Number(b.CurrentRank) }
function ascendingLane(a, b) { return Number(a.lane) - Number(b.lane) }
function descendingLane(a, b) { return Number(a.lane) + Number(b.lane) }

function reposition(WhichLeadeboard, athletes) {
    var height = $(WhichLeadeboard + " #athletes .athlete").height();
    console.log("athletes : ", athletes)
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
        if (wod.division == division){
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

function updateDynamics(newScoring, status){
    try{

        console.log("New Scoring",newScoring)

        Object.keys(athletes_divison).forEach(key => {
            // console.log(athletes_divison[key])
            
            Object.keys(athletes_divison[key]).forEach(i => {

                athletes_divison[key][i] = Object.assign( {}, athletes_divison[key][i],fetchNewData(newScoring, athletes_divison[key][i].lane));
                athletes_divison[key][i].$item.find(".rank").text(athletes_divison[key][i].CurrentRank);

                if( status == "W" ){
                    // athletes_divison[key][i].$item.find(".lane").hide();
                    if (workout.length>0){
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
                            }
                            else {
                                athletes_divison[key][i].$item.find(".rounds").hide();
                                athletes_divison[key][i].$item.find(".mvt").text(Mvt_name[athletes_divison[key][i].lane].mvtNames);
                                athletes_divison[key][i].$item.find(".score").text(Mvt_name[athletes_divison[key][i].lane].scoreAbsMvt + "/" + Mvt_name[athletes_divison[key][i].lane].repTarget);
                                
                            }
                        }
                    }
                    else{
                        athletes_divison[key][i].$item.find(".score").text(athletes_divison[key][i].score_abs)
                    }
                }



                if(athletes_divison[key][i].result == "" ){
                    // athletes_divison[key][i].$item.find(".score").text(athletes_divison[key][i].score_rel);
                    if (athletes_divison[key][i].CurrentRank == 1){
                        // athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right, rgba(0,0,0,0), " + first_rank__color + ")")
                        athletes_divison[key][i].$item.find(".rank").css("background", first_rank__color )
                        athletes_divison[key][i].$item.find(".rank").css("color", tx_first_rank__color )

                        athletes_divison[key][i].$item.find(".score").css("color", tx_first_rank__color )
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + first_rank__color + ")")
                        // athletes_divison[key][i].$item.find(".score").text(athletes_divison[key][i].score_abs);
                    }
                    else if (athletes_divison[key][i].CurrentRank == 2){
                        // athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right, rgba(0,0,0,0)," + second_rank__color + ")")
                        athletes_divison[key][i].$item.find(".rank").css("background", second_rank__color )
                        athletes_divison[key][i].$item.find(".rank").css("color", tx_second_rank__color )
                        athletes_divison[key][i].$item.find(".score").css("color", tx_second_rank__color )
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + second_rank__color + ")")
                    }
                    else if (athletes_divison[key][i].CurrentRank == 3){
                        // athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right, rgba(0,0,0,0)," + third_rank__color + ")")
                        athletes_divison[key][i].$item.find(".rank").css("background", third_rank__color )
                        athletes_divison[key][i].$item.find(".rank").css("color", tx_third_rank__color )
                        athletes_divison[key][i].$item.find(".score").css("color", tx_third_rank__color )
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + third_rank__color + ")")
                    }
                    else {
                        athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right, rgba(0,0,0,0)," + second_color + ")")
                        athletes_divison[key][i].$item.find(".rank").css("background", second_color )
                        athletes_divison[key][i].$item.find(".rank").css("color", tx_second_color )
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + second_color + ")")
                        athletes_divison[key][i].$item.find(".score").css("color", tx_second_color )
                    }
                }
                else{
                    // athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right, rgba(0,0,0,0)," + finish__color + ")")
                    athletes_divison[key][i].$item.find(".rank").css("background", finish__color )
                    athletes_divison[key][i].$item.find(".rank").css("color", tx_finish__color )
                    athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + finish__color + ")")
                    athletes_divison[key][i].$item.find(".score").css("color", tx_finish__color)
                    var result = athletes_divison[key][i].result;
                    if (athletes_divison[key][i].status == "F"){

                        athletes_divison[key][i].$item.find(".score").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
                    }
                    else if (athletes_divison[key][i].status == "T"){
                        athletes_divison[key][i].$item.find(".score").text(result.toString());
                    }
                    athletes_divison[key][i].$item.find(".popup").fadeOut();
                }

            })

            // console.log(athletes_divison[key])

            if(status != "0" || athletes_divison[key][1].CurrentRank != null){
                // console.log(athletes_divison[key])
                athletes_divison[key].sort(ascendingRank);
                if( typeWod_G == "amrap"){
                    console.log("AMRAP")
                    // document.getElementById('repTobeat').innerHTML =athletes_divison[key][0].score_abs + " reps";
                }
            }
            else{
                athletes_divison[key].sort(ascendingLane);
                clearInterval(affiliateTimer)
            }
            reposition("#leaderboard"+ key, athletes_divison[key]);

        })
    }
    catch(e){
        console.log(e)
    }
}    

function resetLeaderboard(data){
    try{
        
        // ! On prend le tableau
        
        var $tab = $("#tableur")
        $tab.find(".global").remove();

        //! on traite le wod en cours 

        typeWod_G = data.heatInfo[0].type;

        // ! On récupère toutes les divisions présentes dans la heat en cours

        var divisionsNames = []
        var repTarget = [];

        athletes_divison = []

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
                    repTarget[y] = wod.total_reps
                    // totalRep[y] = wod.total_reps;
                    workout[y] = wod;
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

        console.log(divisionsNames)
        console.log(repTarget)


        if (data.heatInfo[0].type == "time"){
            var typeWod = "";
            for(i=0; i< data.WorkoutInfo[0]; i++){
                repTarget[i] = data.WorkoutInfo[i].total_reps + " reps" ;
            }
        }
        else if (data.heatInfo[0].type == "amrap"){
            var typeWod = "BEAT"
            // var repTarget = data.WorkoutInfo[0].total_reps + " reps" ;
        }


        console.log(divisionsNames)

        //! Initialisation des athletes dans un seul format avec un triage par division

        for (var y = 0; y < divisionsNames.length; y++){
            athletes = new Array();
            for(let i = 0;i < data.athletes.length;i++){
                if(data.athletes[i].division == divisionsNames[y]){
                    athletes[i] = athletes_init;
                    athletes[i] = Object.assign({}, athletes[i], data.athletes[i])
                    if (athletes[i].countryCode=="" || athletes[i].countryCode==null){athletes[i].countryCode = "FR"}
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
            // console.log(athletes_divison)
        }

        // ! On crée un tableau par division

        // var heatDetails;
        // for (var y = 0; y < Object.keys(athletes_divison).length; y++){
        Object.keys(athletes_divison).forEach(key => {
            //! Ajouter la séparation ici
            if(typeWod_G == "amrap"){
                var textRep = "AMRAP"
            }
            else {
                if(repTarget[key] == undefined){
                    var textRep = "Max de reps";
                }
                else{
                    var textRep = repTarget[key] + " reps";
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
                        '<div class="col">'+
                            mvtDescription[key] + 
                        '</div>' +
                        '<div class="col target">'+
                            '<div class="row teamTarget'+ [key]+'"/>'+
                            '<div class="row repTarget'+ [key]+'" >'+
                                textRep + 
                            '</div>' +
                        '</div>'+
                    '</div>' +
                    '<table id="leaderboard'+ key +'" class="leaderboard">' +
                        '<tbody id="athletes" class="athletes">' +
                        '</tbody>' + 
                    '</table>' +
                '</div>' 
            );

            // heatDetails.$tabItem = $tabItem;
            $tab.append($tabItem);

            var $list = $("#leaderboard"+ key +" #athletes");
            $list.find(".athlete").remove();

            athletes_divison[key].sort(descendingLane);

            // for(var i = 0; i < athletes_divison[key].length; i++) {
            Object.keys(athletes_divison[key]).forEach(key2 => {

                var aff = athletes_divison[key][key2].affiliate == null ? "-" : athletes_divison[key][key2].affiliate

                console.log(athletes_divison[key])
                var $item = $(
                    '<tr class="athlete">' + 
                        '<td class="rank">' + athletes_divison[key][key2].CurrentRank  + '</th>' + 
                        '<td class="lane">'+ athletes_divison[key][key2].lane + '</td>' + 
                        '<td class="flag">' + '<img src="https://flagcdn.com/'+ athletes_divison[key][key2].countryCode.toLowerCase() + '.svg" width="30"></img> ' + '</td>' +
                        '<td class="text-nowrap text-truncate text-left name">' + athletes_divison[key][key2].displayName + '</td>' + 
                        '<td class="text-nowrap text-truncate text-left affiliate">' + aff + '</td>' +
                        '<td class="rounds text-nowrap text-truncate"></th>' + 
                        '<td class="score align-items-xl-center">' + athletes_divison[key][key2].score_abs + '</td>' +
                        '<td class="mvt text-nowrap text-truncate">' + athletes_divison[key][key2].currentMouvement[0].mouvementName  + '</th>' + 
                    '</tr>'
                );
                athletes_divison[key][key2].$item = $item;
                athletes_divison[key][key2].$item.find(".rounds").hide()
                !showFlag.value ? athletes_divison[key][key2].$item.find(".flag").hide() : "" ;
                !showAffiliate.value ? athletes_divison[key][key2].$item.find(".affiliate").hide() : "" ;
                // athletes_divison[key][key2].$item.find(".score").hide() 
                $list.append($item);
            })
                athletes_divison[key].sort(ascendingLane);

                console.log($(".athlete").height())
                var height_tot = ( Object.keys(athletes_divison[key]).length * $(".athlete").height()) ;
                console.log("Height tot = ",height_tot)

                $("#leaderboard"+ key).css("height", height_tot)
                reposition("#leaderboard"+ key, athletes_divison[key]);
        })
    }
    catch(e){
        console.log(e)
    }
}


