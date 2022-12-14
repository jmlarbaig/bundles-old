async function ConnectionCC(){
    try{


        let user = document.getElementById('usernameCC').value.toString()
        let passwd = document.getElementById('passwordCC').value.toString()
        let event = document.getElementById('eventId').value


        console.log(user)

        await logCC(user, passwd)

        dataNewConfigCC.usernameCC = user
        dataNewConfigCC.passwordCC = passwd
        dataNewConfigCC.eventId = event

        nodecg.sendMessage('dataOverwriteCC', dataNewConfigCC);

        eventId.value = event
        
        await updateEvent(event)
        await updateWorkoutInfos(event)
    }
    catch(e){
        ErrorFetch('cc', e)
    }
}


async function updateScoreToBeat(workoutId, athletes){
    var divisionName = [];
    var divisionId = [];
    athletes.forEach(function(athlete){
        // console.log("division Athlete = ", athlete.division)
        // console.log("true = ", !divisionName.includes(athlete.division))
        if( !divisionName.includes(athlete.division) ){
            divisionName.push(athlete.division)
        }
    });

    console.log("Divison Name = ",divisionName)
    console.log("divisionsEvent = ",Divisions.value)

    for (let division of divisionName){
        let div = Divisions.value.find( element => element.title === division)
        console.log("div_ID",div)
        divisionId.push(div)
    }

    console.log("Divison ID = ",divisionId)
    var result = []
    for await (let element of divisionId){
        if (element != undefined){
            // console.log("élément : ", element)
            let res = await getHeatsTopScore(workoutId, element.id);
            console.log("top =", res)
            result.push(res)
        }
    }
    TopScore.value = result
}

    async function updateWorkoutInfos(eventId){
        var data = await loadWorkouts(eventId);
        WorkoutInfos.value = data;
    }

    async function updateEvent(eventId){
        // var data = await loadInfoEventCC(eventId);
        var dashboard = await dashboardEventCC(document.getElementById('eventId').value)

        console.log("Dashboard division ",dashboard.divisions)

        // console.log('Resultats Heat = ', result)
        affiliateStats.value = dashboard.affiliates
        Divisions.value = dashboard.divisions
    }

