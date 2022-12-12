
function timeToDateTime(time) {
    var times = time.split(':');
    if (times.length == 3){
        var hours = times[0];
        var minutes = times[1];
        var secmili = times[2].split('.');
        var seconds = secmili[0];
        var mili = secmili[1];

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();

        // Pas de milliseconds dans le constructeur Date
        return new Date(year, month, day, hours, minutes, seconds);
    }
}

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (secs<10) { secs = '0' + secs}
    if (mins<10) { mins = '0' + mins}
    return mins + ':' + secs ;
}


function typeWorkout(data){

    //! on traite le wod en cours 
    let typeWod = data[0].type;
    let formatWod = data[0].format
    let timecap = data[0].timeCap

    tc = timecap.split(':');

    if (tc[0] != "00"){
        timecap = tc[0] + "'" + tc[1] + "'" + tc[2];
    }
    else if(tc[1] != "00" ){
        timecap = tc[1] + "'" + tc[2];
    }
    else{
        timecap = "0'"+ tc[2];
    }

    return ({typeWod, formatWod, timecap})
}

function treatReptarget(repTarget){
    var textRep =""
    if(heat.typeWod == "amrap"){
        textRep = "MAX REPS"
    }
    else if(heat.typeWod == "time") {
        if(repTarget == undefined){
            textRep = "FOR TIME";
        }
        else{
            textRep = repTarget + " REPS";
        }
    }
    return textRep
}

function treatDisplayName(displayName){
    if (heat.formatWod == "individual"){
        let char = [];
        char = displayName.toString().split(/\s+/)
        newName = char[0].substring(0,1) + ". " + char[1]
    }
    else{
        newName = displayName.toLowerCase().replace("crossfit","");
    }
    return newName
}

function treatWorkouts(data){
    for ( let workout of data){
        const { description, mvt_id, mvt_names, mvt_reps, mvt_units, increments, total_reps, rounds, rep_per_rounds, division, mvt_type } = data

    }
}

function treatDivisions(divisions, newAth) {

    let leaderboards = [];

    for (var y = 0; y < divisions.length; y++){
        let _athletes = new Array();
        for(let i = 0;i < newAth.length;i++){
            // console.log("i =", i)
            if( newAth[i] != undefined){
                if(newAth[i].division == divisions[y] ){
                    _athletes[i] = JSON.parse(JSON.stringify(athletes_init));
                    _athletes[i] = Object.assign({}, _athletes[i], newAth[i])
                    if (_athletes[i].countryCode=="" || _athletes[i].countryCode==null){_athletes[i].countryCode = "FR"}
                    else{
                        for(let f=0; f < flag.length; f++){
                            if (_athletes[i].countryCode == flag[f]["3L"]){
                                _athletes[i].countryCode = flag[f]["2L"];
                                break;
                            }
                        }
                    }
                }
            }
        }
        // console.log(_athletes)
        leaderboards[y] = _athletes
    }
    return leaderboards;

}


function ascendingRank(a, b) { return Number(a.CurrentRank) - Number(b.CurrentRank) }
function descendingRank(a, b) { return Number(a.CurrentRank) + Number(b.CurrentRank) }
function ascendingLane(a, b) { return Number(a.lane) - Number(b.lane) }
function descendingLane(a, b) { return Number(a.lane) + Number(b.lane) }

function reposition(leaderboard, athletes) {
    switch(overlay){
        case 'overlay_top':
            repoLeft(leaderboard, athletes)
            break;
        default:
            repoTop(leaderboard, athletes);
            break;
    }

}

function repoLeft(lead_, aths_) {
    var y = 0;
    let margin = 0
    Object.values(aths_).forEach(elm => {
        if(elm.$item.css('margin') != ''){
             margin = parseInt(elm.$item.css('margin').replace('px',''))
        }else{
            margin = 0;
        }
        if(elm.$item.find(lead_) != undefined){
            elm.$item.css("left", y + "px");
            y += elm.$item.width() + margin;
        }
    })
}  

function repoTop(lead_, aths_) {
    //initialisation la position de départ
    let y =  parseInt($(lead_ + " .header").css('height').replace('px'));
    Object.values(aths_).forEach(elm => {
        if(elm.$item.find(lead_) != undefined){
            elm.$item.css("top", y + "px");
            y += elm.$item.height();
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
    // console.log(workouts)
    for (let wod of workouts){
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
                        // console.log(nbrReps)
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