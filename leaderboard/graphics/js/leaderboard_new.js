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
    var y =  $(WhichLeadeboard + " .header").height();
    Object.keys(athletes).forEach(key => {
        if(athletes[key].$item.find(WhichLeadeboard) != undefined){
            athletes[key].$item.css("top", y + "px");
            y += athletes[key].$item.height();
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
            return( {'scoreAbsMvt':wod.mvt_reps[index] + res,'scoreRelMvt':res,'id':wod.mvt_id[index],'repTarget':wod.mvt_reps[index],'mvtNames':wod.mvt_names[index]})
        }
    }
}

function mvtIndexAmrap(nbrReps, division, rounds){
    // console.log("AMRAP Nbr De reps = ", nbrReps, " & Division = ", division)
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
var height_tot = 0

function updateDynamics(newScoring, status){
    try{

        // console.log("New Scoring",newScoring)

        Object.keys(athletes_divison).forEach(key => {

            // console.log(athletes_divison[key])
            
            if(status != "0" || athletes_divison[key][1].CurrentRank != null){
            Object.keys(athletes_divison[key]).forEach(i => {

                height_tot = 0;
                console.log("test")
                // console.log("Athlete = ", athletes_divison[key][i])
                // console.log("i =", i)

                athletes_divison[key][i] = Object.assign( {}, athletes_divison[key][i],fetchNewData(newScoring, athletes_divison[key][i].lane));
                athletes_divison[key][i].$item.find(".rank").text(athletes_divison[key][i].CurrentRank);
                

                // if(athletes_divison[key][i].currentMouvement[0].mouvementName != athletes_divison[key][i].$item.find(".popup").text() && status == "W" ){
                if( status == "W" ){


                    athletes_divison[key][i].$item.find(".rank").show();
                    athletes_divison[key][i].$item.find(".score").show();

                    // athletes_divison[key][i].$item.find(".lane").hide();
                    if(workout.length > 0 && athletes_divison[key][i].result == ""){
                            
                        // ID[lane] = mvtIndex(athletes_divison[key][i].score_abs, athletes_divison[key][i].division)
                        Mvt_name[athletes_divison[key][i].lane] = typeWod_G != "amrap" ? mvtIndexForTime(athletes_divison[key][i].score_abs, athletes_divison[key][i].division) : mvtIndexAmrap(athletes_divison[key][i].score_abs, athletes_divison[key][i].division, athletes_divison[key][i].log_round_time[0].length +1)
                        // console.log(Mvt_name)


                        if ( Mvt_name[athletes_divison[key][i].lane].mvtNames.includes("_")){
                            Mvt_name[athletes_divison[key][i].lane].mvtNames = Mvt_name[athletes_divison[key][i].lane].mvtNames.replaceAll("_", " ")
                        }

                        if ( Mvt_name[athletes_divison[key][i].lane].mvtNames.includes("Sprint")){
                            athletes_divison[key][i].$item.find(".popup").text( Mvt_name[athletes_divison[key][i].lane].mvtNames);
                            athletes_divison[key][i].$item.find(".score").text("");
                            athletes_divison[key][i].$item.find(".popup").show();
                        }
                        else{
                            if (typeWod_G == 'amrap'){

                                athletes_divison[key][i].$item.find(".rounds").show();
                                // console.log("Rounds ",Mvt_name[athletes_divison[key][i].lane].rounds)
                                if (!Number.isNaN(Mvt_name[athletes_divison[key][i].lane].rounds)){
                                    athletes_divison[key][i].$item.find(".rounds").text("R"+(Mvt_name[athletes_divison[key][i].lane].rounds));
                                }
                                else{
                                    athletes_divison[key][i].$item.find(".rounds").text("R1");
                                }

                                if (i!=0){
                                    if (Mvt_name[athletes_divison[key][i].lane].id != Mvt_name[athletes_divison[key][i-1].lane].id ){
                                        athletes_divison[key][i].$item.find(".popup").text(Mvt_name[athletes_divison[key][i].lane].mvtNames);
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
                                        athletes_divison[key][i].$item.find(".popup").text(Mvt_name[athletes_divison[key][i].lane].mvtNames);
                                        athletes_divison[key][i].$item.find(".score").text(Mvt_name[athletes_divison[key][i].lane].scoreAbsMvt + "/" + Mvt_name[athletes_divison[key][i].lane].repTarget);
                                        athletes_divison[key][i].$item.find(".popup").show();
                                    }
                                }
                            }
                            else {

                                athletes_divison[key][i].$item.find(".rounds").hide();
                                if (i!=0){
                                    if (Mvt_name[athletes_divison[key][i].lane].id != Mvt_name[athletes_divison[key][i-1].lane].id ){
                                        // athletes_divison[key][i].$item.find(".popup").text('\u{2192}'+Mvt_name[athletes_divison[key][i].lane].repTarget + " " + Mvt_name[athletes_divison[key][i].lane].mvtNames);
                                        // athletes_divison[key][i].$item.find(".score").text(Mvt_name[athletes_divison[key][i].lane].scoreAbsMvt);
                                        athletes_divison[key][i].$item.find(".popup").text(Mvt_name[athletes_divison[key][i].lane].mvtNames);
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
                                        athletes_divison[key][i].$item.find(".popup").text(Mvt_name[athletes_divison[key][i].lane].mvtNames);
                                        athletes_divison[key][i].$item.find(".score").text(Mvt_name[athletes_divison[key][i].lane].scoreAbsMvt + "/" + Mvt_name[athletes_divison[key][i].lane].repTarget);
                                        athletes_divison[key][i].$item.find(".popup").show();
                                    }
                                }
                            }
                        }
                    }
                    else{
                        athletes_divison[key][i].$item.find(".score").text(athletes_divison[key][i].score_abs)
                    }
                }



                if(athletes_divison[key][i].result == "" ){
                    athletes_divison[key][i].$item.find(".score").css("width", "80px")
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
                        athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right, rgba(0,0,0,0)," + main_color + ")")
                        athletes_divison[key][i].$item.find(".rank").css("background", main_color )
                        athletes_divison[key][i].$item.find(".rank").css("color", tx_main_color )
                        athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + second_color + ")")
                        athletes_divison[key][i].$item.find(".score").css("color", tx_main_color )
                    }
                }
                else{
                    // athletes_divison[key][i].$item.find(".rank").css("background", "linear-gradient(to right, rgba(0,0,0,0)," + finish__color + ")")
                    athletes_divison[key][i].$item.find(".rank").css("background", finish__color )
                    athletes_divison[key][i].$item.find(".rank").css("color", tx_finish__color )
                    athletes_divison[key][i].$item.find(".score").css("background", "linear-gradient(to right, " + main_color + "," + finish__color + ")")
                    athletes_divison[key][i].$item.find(".score").css("color", tx_finish__color)
                    var result = athletes_divison[key][i].result;
                    athletes_divison[key][i].$item.find(".score").css("width", "120px")
                    if (athletes_divison[key][i].status == "F"){
                        athletes_divison[key][i].$item.find(".popup").hide();
                        athletes_divison[key][i].$item.find(".score").text(result.toString().slice(result.length - 9, result.length - 8) != "0" ? result = result.toString().slice(result.length -8, result.length) : result.toString().slice(result.length - 7, result.length - 6) != "0" ? result = result.toString().slice(result.length -7, result.length)  : result = result.toString().slice(result.length -6, result.length));
                    }
                    else if (athletes_divison[key][i].status == "T"){
                        athletes_divison[key][i].$item.find(".score").text(result.toString());
                    }
                    athletes_divison[key][i].$item.find(".popup").hide();
                }

                    height_tot +=  athletes_divison[key][i].$item.height();

             })

                athletes_divison[key].sort(ascendingRank);
                setTimeout(()=>{
                    reposition("#leaderboard"+ key, athletes_divison[key]);
                },100)
            }
            else{
                athletes_divison[key].sort(ascendingLane);            
                console.log("height total =", height_tot + $("#leaderboard"+key + " .header").height()) 
                $("#leaderboard"+ key).css("height", height_tot + $("#leaderboard"+key + " .header").height())
                reposition("#leaderboard"+ key, athletes_divison[key]);
                // clearInterval(affiliateTimer)
            }

            // console.log("height ",$("#leaderboard"+ key +" #athletes").find(".powered"))

            // if ($("#leaderboard"+ key +" #athletes").find(".powered").length < 1){
            //     var $item = $( 
            //         '<div class="athlete powered" id="powered'+key+'">' + 
            //         '<div class="img"><img src="./img/PRESTA/SK-logo.png" alt="" height=15></img></div>' + 
            //             '<div class="text">POWERED BY</div>' + 
            //             '<div class="img"><img src="./img/PRESTA/FV-logo.png" alt="" height=15 ></img></div>' + 
            //         '</div>'
            //     );
            //     $("#leaderboard"+ key +" #athletes").append($item);
            // }
            
            // var height_tot = Object.keys(athletes_divison[key]).length * $("#leaderboard"+ key +" .athlete .ath").height() +50


            // $("#powered"+key).css('top', $("#leaderboard"+ key).height()-32)

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

        showLeaderboard_lead.value != true ?  $("#tableur").hide(1) : ""

        // console.log("Show leaderboard : ",showLeaderboard_lead.value)
        
        var $tab = $("#tableur")
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

        // console.log(divisionsNames)
        // console.log(repTarget)



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

        heatDetails;
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
                if(repTarget[key] == undefined){
                    var textRep = "";
                }
                else{
                    var textRep = repTarget[key] + " REPS";
                }
            }
            var $tabItem = $(
                '<div id="leaderboard'+ key +'" class="leaderboard">' +
                    '<div class="header">'+
                        '<div class="text-nowrap text-truncate text-left division">' + divisionsNames[key] + '</div>' +
                        '<div class="repTar repTarget'+[key]+'">' + textRep + '</div>' +
                    '</div>'+
                    '<div id="athletes" class="athletes">' +
                    '</div>' + 
                '</div>'
            );

            heatDetails.$tabItem = $tabItem;
            $tab.append($tabItem);

            var $list = $("#leaderboard"+ key +" #athletes");
            $list.find(".athlete").remove();

            athletes_divison[key].sort(descendingLane);

            var height_tot = 0;

            // for(var i = 0; i < athletes_divison[key].length; i++) {
            Object.keys(athletes_divison[key]).forEach(key2 => {
                let displayName;
                if (format == "individual"){
                    let char = [];
                    char = athletes_divison[key][key2].displayName.toString().split(" ")
                    displayName = char[0].substring(0,1) + ". " + char[1]
                }
                else{
                    
                    displayName = athletes_divison[key][key2].displayName.toLowerCase().replace("crossfit","");
                }
                
                var $item = $( 
                    '<div class="athlete" id="aht'+athletes_divison[key][key2].lane+'">' + 
                        '<div class="popup">' + '</div>' +
                        '<div class="ath">' +
                            '<div class="rank"></div>' + 
                            '<div class="lane"># '+ athletes_divison[key][key2].lane + '</div>' + 
                            '<div class="flag">' + '<img src="https://flagcdn.com/'+ athletes_divison[key][key2].countryCode.toLowerCase() + '.svg" width="30"></img> ' + '</div>' +
                            '<div class="text-nowrap text-truncate text-left name">' + displayName + '</div>' + 
                            '<div class="score"></div>' +
                            '<div class="text-nowrap text-truncate rounds">' + '</div>' +
                        '</div>' +
                    '</div>'
                );
                athletes_divison[key][key2].$item = $item;
                athletes_divison[key][key2].$item.find(".rounds").hide();
                athletes_divison[key][key2].$item.find(".rank").hide();
                athletes_divison[key][key2].$item.find(".score").hide();
                athletes_divison[key][key2].$item.find(".popup").hide();
                !showFlag.value ? athletes_divison[key][key2].$item.find(".flag").hide() : "" ;
                $list.append($item);

                // console.log(athletes_divison[key][key2].$item)
                height_tot +=  athletes_divison[key][key2].$item.height();

            })

                setTimeout(()=>{
                    athletes_divison[key].sort(ascendingLane);
                    $("#leaderboard"+ key).css("height", height_tot + $("#leaderboard"+key + " .header").height() )
                    reposition("#leaderboard"+ key, athletes_divison[key]);
                    // animateCSS('#aht'+athletes_divison[key][key2].lane, 'fadeInLeft')
                }, 1000)


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
