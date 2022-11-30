const statics = nodecg.Replicant('statics', 'connector');
// const dynamics = nodecg.Replicant('dynamics', 'connector');

const UrlChange = nodecg.Replicant('UrlChange');
const UrlChange_internal = nodecg.Replicant('UrlChange_internal')

const ParticipantsWod = nodecg.Replicant('ParticipantsWod','connector');


const setupLeaderboard = nodecg.Replicant('setupLeaderboard')

const logoEvent = nodecg.Replicant('assets:logoEvent');
const pubVideo = nodecg.Replicant('assets:pub');
const videoAth = nodecg.Replicant('assets:ath');
const Ft_Ap = nodecg.Replicant('fortime_amrap')
const videoInfos = nodecg.Replicant('videoInfos')
const videoShow = nodecg.Replicant('videoShow')

const ipAddress = nodecg.Replicant('ipAddress', 'connector')

const athletesHeat = nodecg.Replicant('athletesHeat')
const HideLane = nodecg.Replicant('HideLane')


var participantEvent = {}
var participantsCurrentHeats = {}
var currentHeat = {}


statics.on('change', (newValue, oldValue) => {
    // console.log("static = ", newValue)
    // console.log("ParticipantsWod = ", ParticipantsWod.value)

    // LogoImg.value = newValue.logoUrl
    // if(ParticipantsWod.value != undefined){
    //     currentHeat =  ParticipantsWod.value.find(element => element.id == newValue.workoutId)
    //     console.log(" currentHeat : ",currentHeat)
    //     participantsCurrentHeats = currentHeat.heats.find(element => element.id == newValue.heatId)
    //     console.log(" participantsCurrentHeats : ",participantsCurrentHeats)
        
    //     newValue.athletes.forEach(function(element){
    //         console.log(element.lane-1)
    //         element.affiliate = participantsCurrentHeats.stations.find(elt => elt.station == element.lane).affiliate
    //     })
        
    //     participantsCurrentHeats.isCurrent = currentHeat.name
    //     athletesHeat.value = participantsCurrentHeats
    
    //     resetLane(newValue)
    // }
}); 


nodecg.listenFor('connection', 'connector', value => {
    ConnectionLeaderboard.value = value;
})

function actualiser(){

    Object.keys(setupLeaderboard.value).forEach((e, i)=>{
        setupLeaderboard.value[e] = document.getElementById(e).checked
    })

    // setupLeaderboard.value.logo = document.getElementById("logo").checked;
    // setupLeaderboard.value.heat = document.getElementById("heat").checked;
    // setupLeaderboard.value.flag = document.getElementById("flag").checked;
    // setupLeaderboard.value.wod = document.getElementById("wod").checked;
    // setupLeaderboard.value. = document.getElementById("chrono").checked;
    // setupLeaderboard.value = document.getElementById("fortimeAmrap").checked;
    // setupLeaderboard.value = document.getElementById("affiliate").checked;
    // setupLeaderboard.value = document.getElementById("leaderboard").checked;
    
    // UrlChange.value = document.getElementById("showChrono").checked;

    nodecg.sendMessage('setupFile', setupLeaderboard.value);
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


videoAth.on('change', (newValue)=>{
    resetVideo(newValue)
})

pubVideo.on('change', (newValue)=> {
    resetVideoPub(newValue);
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


setupLeaderboard.on('change', (newValue, oldValue)=>{
    Object.keys(newValue).forEach((e, i)=>{
        if(newValue[e] != oldValue[e]){
                document.getElementById(e).checked = newValue[e];
            }
    })
})