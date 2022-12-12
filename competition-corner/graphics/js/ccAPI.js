
const token = nodecg.Replicant('TOKEN','connector');
const cors = "https://corsfv.herokuapp.com/"

async function loadAttributionLane(heatId){
    let response = await fetch(cors + "https://competitioncorner.net/api/v1/events/cuecard/heats/"+heatId+"/heatlane" , {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token},
    }).then((response)=>{
        return response.json();
    }).catch((err)=>{return err})
    return response;
}

async function loadDivisionWorkoutResult(divisionId, workoutId){
    let response = await fetch(cors + "https://competitioncorner.net/api/v1/cuecard/divisionresults/"+divisionId+"/workout/"+workoutId , {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token},
    }).then((response)=>{
        return response.json();
    }).catch((err)=>{return err})
    return response;
}

async function loadHeatResult(heatId){
    let response = await fetch(cors + "https://competitioncorner.net/api/v1/events/cuecard/heats/"+ heatId +"/results" , {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token},
    }).then((response)=>{
        return response.json();
    }).catch((err)=>{return err})
    return response;
}

async function loadOverallDivisionStanding(eventId,divisionName){
    let response = await fetch(cors + "https://competitioncorner.net/api/v1/events/" + eventId + "/cuecard/standings/"+ divisionName , {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + token},
    }).then((response)=>{
        return response.json();
    }).catch((err)=>{return err})
    return response;
}

"https://competitioncorner.net/api/v1/events/5034/cuecard/standings/team_28601"