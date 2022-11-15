const TOKEN_R = nodecg.Replicant('TOKEN','connector');

var WorkoutTab;

async function updateWorkout(data){

    if(workoutId != data.workoutId){
        var d = await loadWorkoutsPlanning(data.eventId);
    
        WorkoutTab = d.workouts;
    
        console.log(WorkoutTab)
        workoutId = data.workoutId;

        // for(let workout of WorkoutTab){
        for(let i=0; i<WorkoutTab.length;i++){
            console.log(WorkoutTab[i])

            if(WorkoutTab[i].id == data.workoutId){
                // WorkoutTab[i].heats = await loadHeats(WorkoutTab[i].id)
                // WorkoutTab[i].participants = await loadParticpant(data.eventId, WorkoutTab[i].id)
                await loadHeats(WorkoutTab[i].id).then((value) => {
                    WorkoutTab[i].heats = value;
                    // console.log(value);
                    // expected output: "Success!"
                })
                await loadParticpant(data.eventId, WorkoutTab[i].id).then((value)=>{
                    // console.log(value)
                    WorkoutTab[i].participants = value;
                })
                if(WorkoutTab[i+1] != undefined){
                    i++
                    await loadHeats(WorkoutTab[i].id).then((value) => {
                        WorkoutTab[i].heats = value;
                        // console.log(value);
                        // expected output: "Success!"
                    })
                    await loadParticpant(data.eventId, WorkoutTab[i].id).then((value)=>{
                        // console.log(value)
                        WorkoutTab[i].participants = value;
                    })
                    // WorkoutTab[i].heats = await loadHeats(WorkoutTab[i].id)
                    // WorkoutTab[i].participants = await loadParticpant(data.eventId, WorkoutTab[i].id)
                }
                break;
            }
    
        }

    }
    updateWarmUp( data.workoutId, data.heatId)

    // EventPlanner = [];

    // for(let date of data.dates){
    //     EventPlanner.push(date)
    // }

    // for(let date of EventPlanner){
    //     date.wods = []
    //     for(let wod of WorkoutTab){
    //         if(wod.date == date.value){
    //             date.wods.push(wod)
    //         }
    //     }
    // }

    // ParticipantsWod.value = WorkoutTab
    // WodTab.value = EventPlanner;

}


function updateWarmUp( workoutId, heatId){

    try{
        
        heatWUP = []
        var d = {"wod" :"", "heat":""}
        var d2 = {"wod" :"", "heat":""}
        var d3 = {"wod" :"", "heat":""}
        
        if (WorkoutTab != undefined){
            for (let i=0; i < WorkoutTab.length; i++){
                if(WorkoutTab[i].id == workoutId){
                    console.log(WorkoutTab[i].heats)
                    for(let y=0; y < WorkoutTab[i].heats.length; y++){
                        if (WorkoutTab[i].heats[y].id == heatId){
                            d.wod = (WorkoutTab[i])
                            d.heat = (WorkoutTab[i].heats[y])
                            if(WorkoutTab[i].heats[y+1] == undefined){
                                if(WorkoutTab[i+1].heats[0] != undefined){
                                    d2.heat = (WorkoutTab[i+1].heats[0])
                                    d2.wod = (WorkoutTab[i+1])
                                    if(WorkoutTab[i+1].heats[1] != undefined){
                                        d3.heat = (WorkoutTab[i+1].heats[1])
                                        d3.wod = (WorkoutTab[i+1])
                                    }
                                }
                            }
                            else {
                                d2.heat = (WorkoutTab[i].heats[y+1])
                                d2.wod = (WorkoutTab[i])

                                if(WorkoutTab[i].heats[y+2] == undefined){
                                    if(WorkoutTab[i+1].heats[0] != undefined){
                                        d3.heat = (WorkoutTab[i+1].heats[0])
                                        d3.wod = (WorkoutTab[i+1])
                                    }
                                }
                                else {
                                    d3.heat = (WorkoutTab[i].heats[y+2])
                                    d3.wod = (WorkoutTab[i])
                                }
                            }
                        }
                    }
                }
            }
            
            d.heat.current = "CURRENT"
            d2.heat.current = "NEXT"
            d3.heat.current = "CALL FOR WARM UP"
            
            heatWUP.push(d)
            heatWUP.push(d2)
            heatWUP.push(d3)

            resetWarmup(heatWUP)
        }
    }
    catch(e){
        console.log(e)
        // document.getElementById('log_error_static').innerHTML = e;
    }
}


async function loadWorkouts(eventId, workoutId){
    let response = await fetch("https://competitioncorner.net/api2/v1/events/"+ eventId +"/workouts/", {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + TOKEN_R.value}
    });
    let json = await response.json();
    return json;
}

async function loadWorkoutsPlanning(eventId) {
    let response = await fetch("https://competitioncorner.net/api2/v1/schedule/events/" + eventId + "/workouts");
    let json = await response.json();
    return json;
}


async function loadHeats(workoutId) {
    var myInit = { 
        method: "GET", 
        mode: 'cors', 
        headers: { 
            'Content-Type': 'text/html',
        }
    }

    let response = await fetch('https://competitioncorner.net/api2/v1/schedule/workout/' + workoutId, myInit);

    let json =  response.json();
    return json;
}


async function loadParticpant(eventId, workoutID) {
    let response = await fetch("https://competitioncorner.net/api2/v1/events/"+ eventId + "/workouts/"+ workoutID +"/eligible-participants", {
        method:"GET",
        headers:{'Authorization': 'Bearer ' + TOKEN_R.value}
    });
    let json = await response.json();
    return json;
}