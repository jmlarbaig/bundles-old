
const UrlChange = nodecg.Replicant('UrlChange');
const UrlChange_internal = nodecg.Replicant('UrlChange_internal')


const setupLeaderboard = nodecg.Replicant('setupLeaderboard')

const logoEvent = nodecg.Replicant('assets:logoEvent');

const ipAddress = nodecg.Replicant('ipAddress', 'connector')

const athletesHeat = nodecg.Replicant('athletesHeat')


var participantEvent = {}
var participantsCurrentHeats = {}
var currentHeat = {}

const eventInfos = nodecg.Replicant('eventInfos', 'connector');

eventInfos.on('change',(value)=>{
    if(value != undefined){
        let $event = $("#box_event");
        $event.find('#event').remove();
    
        let $heat = $("#box_heat");
        $heat.find('#heat').remove();
    
        let $workout = $("#box_workout");
        $workout.find('#workout').remove();
    
        let $itemEvent = $(
            '<div id="event" class="infos">'+
                '<div class="name">' + value.eventName.toUpperCase() + '</div>' +
                '<div class="id">(Id : ' + value.eventId + ')</div>' +
                '<div class="location">' + value.location.toUpperCase() + '</div>' +
            '</div>'
        )
    
        let $itemHeat = $(
            '<div id="heat" class="infos">'+
                '<div class="name">' + value.heatName.toUpperCase() + '</div>' +
                '<div class="id">(Id : ' + value.heatId + ')</div>' +
                '<div class="time">' + value.heatTime + '</div>' +
            '</div>'
        )
    
        let $itemWorkout = $(
            '<div id="workout" class="infos">'+
                '<div class="name">' + value.workoutName.toUpperCase() + '</div>' +
                '<div class="id">(Id : ' + value.workoutId + ')</div>' +
                '<div class="type">' + value.wodType.toUpperCase() + '</div>' +
            '</div>'
        )
    
        $event.append($itemEvent)
        $heat.append($itemHeat)
        $workout.append($itemWorkout)
    }
})


function actualiser(){

    const elements = document.querySelectorAll('input[type=checkbox]');

    var data ={};
    elements.forEach( el => {
        data[el.id] = el.checked
    });
    console.log(data)

    // Object.keys(setupLeaderboard.value).forEach((e, i)=>{
    //     console.log(e)
    //     setupLeaderboard.value[e] = document.getElementById(e).checked
    // })

    nodecg.sendMessage('setupFile', data);
}

nodecg.readReplicant('setupLeaderboard', (value)=>{
    try{
        Object.keys(value).forEach((e, i)=>{
            document.getElementById(e).checked = value[e];
        })
    }catch(err){
        console.log(err)
    }
})

setupLeaderboard.on('change', (newValue, oldValue)=>{
    Object.keys(newValue).forEach((e, i)=>{
        // if(newValue[e] != oldValue[e]){
            document.getElementById(e).checked = newValue[e];
        // }
    })
})

function affichage_leaderboardTV(){
    UrlChange.value  = "http://"+ipAddress.value+":9090/bundles/leaderboard-tv/graphics/index.html"
}

function affichage_ProgressView(){
    UrlChange.value  = "http://"+ipAddress.value+":9090/bundles/progress-view/graphics/index.html"
}

function affichage_VideoView(){
    UrlChange.value  = "http://"+ipAddress.value+":9090/bundles/video/graphics/index.html"
}

function affichage_TimerView(){
    UrlChange.value  = "http://"+ipAddress.value+":9090/bundles/timer2/graphics/index.html"
}

function affichage_PersonnalUrl(){
    let url = document.getElementById("text_url").value;
    UrlChange.value  = url
}

function affichage_AttributeLane(){
    UrlChange_internal.value  = "http://"+ipAddress.value+":9090/bundles/attribute-lane/graphics/transition.html"
}

function affichage_Leaderoard(){
    UrlChange_internal.value  = "http://"+ipAddress.value+":9090/bundles/leaderboard/graphics/index.html"
}

function affichage_AtributeResult(){
    // UrlChange.value  = "http://"+ipAddress.value+":9090/bundles/video/graphics/index.html"
}

