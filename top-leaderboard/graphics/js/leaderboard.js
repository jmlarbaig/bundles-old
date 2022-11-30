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

var workout = [];

var affiliateTimer = undefined
var repTobeat = 0;
var typeWod_G = undefined

var athletes_divison = {}

var currentMvt = undefined;

function ascendingRank(a, b) { return Number(a.CurrentRank) - Number(b.CurrentRank) }
function descendingRank(a, b) { return Number(a.CurrentRank) + Number(b.CurrentRank) }
function ascendingLane(a, b) { return Number(a.lane) - Number(b.lane) }
function descendingLane(a, b) { return Number(a.lane) + Number(b.lane) }

function reposition(WhichLeadeboard, athletes) {
    var y = 0;
    let margin = 0
    Object.keys(athletes).forEach(key => {
        if(athletes[key].$item.css('margin') != ''){
             margin = parseInt(athletes[key].$item.css('margin').replace('px',''))
        }else{
            margin = 0;
        }
        if(athletes[key].$item.find(WhichLeadeboard) != undefined){
            athletes[key].$item.css("left", y + "px");
            y += athletes[key].$item.width() + margin;
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
    // console.log("FOR TIMENbr De reps = ", nbrReps, " & Division = ", division)
    let res = nbrReps;
    let index = 0;
    let mvt;
    let repTarget;
    let id;
    let arrayMvt = [];
    for (let wod of workout){
        if (wod.division == division ){
            if(res !=0){
                // console.log("RepTarget= ", wod.mvt_reps[0])
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
            for(let i = index; i < wod.mvt_names.length ; i++){
                mvtToUP = wod.mvt_names[i].toUpperCase();
                arrayMvt.push("<span>"+wod.mvt_names[i].toUpperCase()+"</span>")
            }
            return( {'scoreAbsMvt':wod.mvt_reps[index] + res,'scoreRelMvt':res,'id':wod.mvt_id[index],'repTarget':wod.mvt_reps[index], 'rounds':0, 'totalReps': wod.total_reps,'mvtNames':wod.mvt_names[index],'arrayMvt':arrayMvt})
        }
    }
    return( {'scoreAbsMvt':res,'scoreRelMvt':res,'id':0,'repTarget':0, 'rounds':0, 'totalReps': wod.total_reps,'mvtNames':'WORKOUT','arrayMvt':['WORKOUTS']})
}

function mvtIndexAmrap(nbrReps, division, rounds){
    // console.log("AMRAP Nbr De reps = ", nbrReps, " & Division = ", division)
    let res = nbrReps;
    let index = 0;
    let mvt;
    let repTarget;
    let id;
    let arrayMvt = [];
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
                    // console.log("MAX : ", nbrReps)
                    // console.log("MAX index : ", index)
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
                }
            }
            for(let i = index; i < wod.mvt_names.length ; i++){
                mvtToUP = wod.mvt_names[i].toUpperCase();
                arrayMvt.push("<span>"+wod.mvt_names[i].toUpperCase()+"</span>")
            }
            return( {'scoreAbsMvt':wod.mvt_reps[index] + res,'scoreRelMvt':res_seuil,'id':wod.mvt_id[index],'repTarget':repTarget,'mvtNames':wod.mvt_names[index], 'rounds':rounds, 'totalReps': wod.total_reps, 'arrayMvt':arrayMvt})
        }
    }
}

let Mvt_name = [];
var height_tot = 0

function updateDynamics(newScoring, status){
    try{


        Object.keys(athletes_divison).forEach(key => {

            if(status != "0" || athletes_divison[key][1].CurrentRank != null){
                Object.keys(athletes_divison[key]).forEach(i => {

                    athletes_divison[key][i] = Object.assign( {}, athletes_divison[key][i],fetchNewData(newScoring, athletes_divison[key][i].lane));
                    athletes_divison[key][i].$item.find(".rank").text(athletes_divison[key][i].CurrentRank);
                    
                    if( status == "W" ){

                        athletes_divison[key][i].$item.find(".score").show();

                        // athletes_divison[key][i].$item.find(".lane").hide();
                        if(workout.length > 0 && athletes_divison[key][i].result == ""){
                                
                            Mvt_name[athletes_divison[key][i].lane] = typeWod_G != "amrap" ? mvtIndexForTime(athletes_divison[key][i].score_abs, athletes_divison[key][i].division) : mvtIndexAmrap(athletes_divison[key][i].score_abs, athletes_divison[key][i].division, athletes_divison[key][i].log_round_time[0].length +1)

                            if ( Mvt_name[athletes_divison[key][i].lane].mvtNames.includes("_")){
                                Mvt_name[athletes_divison[key][i].lane].mvtNames = Mvt_name[athletes_divison[key][i].lane].mvtNames.replaceAll("_", " ")
                            }

                            if ( Mvt_name[athletes_divison[key][i].lane].mvtNames.includes("Sprint")){
                                athletes_divison[key][i].$item.find(".popup").text( Mvt_name[athletes_divison[key][i].lane].mvtNames);
                                athletes_divison[key][i].$item.find(".popup").show();
                                athletes_divison[key][i].$item.find(".score").text(chrono);
                            }
                            else{
                                if (i!=0){
                                    if (Mvt_name[athletes_divison[key][i].lane].id != Mvt_name[athletes_divison[key][i-1].lane].id ){
                                        if (typeWod_G == 'amrap' && !Number.isNaN(Mvt_name[athletes_divison[key][i].lane].rounds)){
                                            athletes_divison[key][i].$item.find(".popup").text( "R"+(Mvt_name[athletes_divison[key][i].lane].rounds) + ' - ' + Mvt_name[athletes_divison[key][i].lane].mvtNames);
                                        }else{
                                            athletes_divison[key][i].$item.find(".popup").text(Mvt_name[athletes_divison[key][i].lane].mvtNames);
                                        }
                                        athletes_divison[key][i].$item.find(".score").text(Mvt_name[athletes_divison[key][i].lane].scoreAbsMvt + "/" + Mvt_name[athletes_divison[key][i].lane].repTarget);
                                        athletes_divison[key][i].$item.find(".popup").show();
                                    }
                                    else{
                                        athletes_divison[key][i].$item.find(".popup").hide();
                                        athletes_divison[key][i].$item.find(".score").text(Mvt_name[athletes_divison[key][i].lane].scoreAbsMvt + "/" + Mvt_name[athletes_divison[key][i].lane].repTarget);
                                    }
                                }
                                else {
                                    if(Mvt_name[athletes_divison[key][i].lane].mvtNames == "" || Mvt_name[athletes_divison[key][i].lane].mvtNames.includes("Workout")){
                                        athletes_divison[key][i].$item.find(".popup").hide();
                                    }
                                    else{
                                        if (typeWod_G == 'amrap' && !Number.isNaN(Mvt_name[athletes_divison[key][i].lane].rounds)){
                                            athletes_divison[key][i].$item.find(".popup").text( "R"+(Mvt_name[athletes_divison[key][i].lane].rounds) + ' - ' + Mvt_name[athletes_divison[key][i].lane].mvtNames);
                                        }else{
                                            athletes_divison[key][i].$item.find(".popup").text(Mvt_name[athletes_divison[key][i].lane].mvtNames);
                                        }
                                        athletes_divison[key][i].$item.find(".score").text(Mvt_name[athletes_divison[key][i].lane].scoreAbsMvt + "/" + Mvt_name[athletes_divison[key][i].lane].repTarget);
                                        athletes_divison[key][i].$item.find(".popup").show();
                                        let mvts = Mvt_name[athletes_divison[key][i].lane].arrayMvt.toString().replaceAll(',', ' - ').replaceAll('_', ' ')
                                        $('#mvt').html(mvts)
                                    }
                                }
                            }
                        }
                        else{
                            athletes_divison[key][i].$item.find(".score").text(athletes_divison[key][i].score_abs)
                        }
                    }



                    if(athletes_divison[key][i].result == "" ){
                        if (athletes_divison[key][i].CurrentRank == 1){
                            athletes_divison[key][i].$item.find(".rank").toggleClass('rank first_rank',true)
                            athletes_divison[key][i].$item.find(".score").toggleClass('score first_rank', true)
                        }
                        else if (athletes_divison[key][i].CurrentRank == 2){
                            athletes_divison[key][i].$item.find(".rank").toggleClass('rank second_rank',true)
                            athletes_divison[key][i].$item.find(".score").toggleClass('score second_rank', true)
                        }
                        else if (athletes_divison[key][i].CurrentRank == 3){
                            athletes_divison[key][i].$item.find(".rank").toggleClass('rank third_rank',true)
                            athletes_divison[key][i].$item.find(".score").toggleClass('score third_rank', true)
                        }
                        else {
                            athletes_divison[key][i].$item.find(".rank").toggleClass('rank other_rank',true)
                            athletes_divison[key][i].$item.find(".score").toggleClass('score other_rank', true)
                        }
                    }
                    else{

                        athletes_divison[key][i].$item.find(".rank").toggleClass('rank finish_rank',true)
                        athletes_divison[key][i].$item.find(".score").toggleClass('score finish_rank', true)

                        var result = athletes_divison[key][i].result;

                        if (athletes_divison[key][i].status == "F"){
                            athletes_divison[key][i].$item.find(".popup").show();
                            athletes_divison[key][i].$item.find(".score").text('FIN')
                            athletes_divison[key][i].$item.find(".popup").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
                            
                        }
                        else if (athletes_divison[key][i].status == "T"){
                            athletes_divison[key][i].$item.find(".score").text('TC');
                            athletes_divison[key][i].$item.find(".pop").text(result.toString());
                        }

                        if(athletes_divison[key][i].CurrentRank > 1 ){
                            setTimeout(()=>{
                                athletes_divison[key][i].$item.remove();
                                reposition("#leaderboard"+ key, athletes_divison[key]);
                            }, 5000)
                        }
                    }


                })

                athletes_divison[key].sort(ascendingRank);
                reposition("#leaderboard"+ key, athletes_divison[key]);

            }
            else{
                athletes_divison[key].sort(ascendingLane);
                reposition("#leaderboard"+ key, athletes_divison[key]);
            }

        })
    }
    catch(e){
        console.log(e)
    }
}    

function resetLeaderboard(){
    try{
        
        data = staticData;
        // console.log("Static Data = ", staticData)
        // ! On prend le tableau

        setupLeaderboard.value.leaderboards != true ?  $(".leaderboards").hide() : ""
        
        var $tab = $(".leaderboards")
        $tab.find(".leaderboard").remove();

        //! on traite le wod en cours 

        typeWod_G = data.heatInfo[0].type;
        format = data.heatInfo[0].format


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

        //! Initialisation des athletes dans un seul format avec un triage par division

        for (var y = 0; y < divisionsNames.length; y++){
            athletes = new Array();
            for(let i = 0;i < data.athletes.length;i++){
                // console.log("i =", i)
                if( data.athletes[i] != undefined){
                    if(data.athletes[i].division == divisionsNames[y] ){
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
            }
            athletes_divison[y] = athletes
            // console.log("Athlete division :",athletes_divison)
        }


        // ! On crée un tableau par division

        // heatDetails;
        // for (var y = 0; y < Object.keys(athletes_divison).length; y++){
        Object.keys(athletes_divison).forEach(key => {
            //! Ajouter la séparation ici
            if(typeWod_G == "amrap"){
                var textRep = "AMRAP"
                if(repTarget[key] == undefined){
                    var textRep = "MAX REPS";
                }
            }
            else {
                textRep = (repTarget[key] + " REPS") || ""
            }
            var $tabItem = $(
                '<div id="leaderboard'+ key +'" class="leaderboard">' +
                    '<div id="athletes'+ key +'" class="athletes">' +
                    '</div>' + 
                '</div>'
            );

            // heatDetails.$tabItem = $tabItem;
            $tab.append($tabItem);

            var $list = $("#leaderboard"+ key +" #athletes"+ key);
            $list.find(".athlete").remove();

            athletes_divison[key].sort(descendingLane);

            var height_tot = 0;

            // for(var i = 0; i < athletes_divison[key].length; i++) {
            Object.keys(athletes_divison[key]).forEach(key2 => {
                let displayName;
                if (format == "individual"){
                    let char = [];
                    char = athletes_divison[key][key2].displayName.toString().split(/\s+/)
                    displayName = char[0].substring(0,1) + ". " + char[1]
                }
                else{
                    
                    displayName = athletes_divison[key][key2].displayName.toLowerCase().replace("crossfit","");
                }
                
                var $item = $( 
                    '<div class="athlete" id="aht'+athletes_divison[key][key2].lane+'">' + 
                        '<div class="ath">' +
                            '<div class="rank">'+ athletes_divison[key][key2].lane + '</div>' + 
                            '<div class="lane"># '+ athletes_divison[key][key2].lane + '</div>' + 
                            '<div class="flag">' + '<img src="https://flagcdn.com/'+ athletes_divison[key][key2].countryCode.toLowerCase() + '.svg"></img> ' + '</div>' +
                            '<div class="name">' + displayName + '</div>' + 
                            '<div class="score intial_rank"></div>' +
                        '</div>' +
                        '<div class="popup">' + '</div>' +
                    '</div>'
                );
                athletes_divison[key][key2].$item = $item;
                athletes_divison[key][key2].$item.find(".popup").hide();
                // athletes_divison[key][key2].$item.find(".name").css('width', 240);
                !setupLeaderboard.value.flag ? athletes_divison[key][key2].$item.find(".flag").hide() : "" ;
                !setupLeaderboard.value.lane ? athletes_divison[key][key2].$item.find(".lane").hide() : "" ;
                $item.hide();
                $list.append($item);

                setTimeout(()=>{
                    height_tot = 150;
                    athletes_divison[key].sort(ascendingLane);
                    $("#leaderboard"+ key + " #athletes"+key).height(height_tot)
                    $("#leaderboard"+ key).height(height_tot + $("#leaderboard"+key + " .header_leaderboard").height())
                    reposition("#leaderboard"+ key, athletes_divison[key]);
                    $item.show()
                    animateCSS('#aht'+athletes_divison[key][key2].lane, 'fadeInLeft')
                }, 500)

            })


        })
    }
    catch(e){
        console.log(e)
    }
}


const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });
