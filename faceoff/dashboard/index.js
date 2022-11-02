const ColorNewConfig = {
    "BgColor":"",
    "MainColor":"",
    "SecondColor":"",
    "FinishRankColor":"",
    "FirstRankColor":"",
    "SecondRankColor":"",
    "ThirdRankColor":"",
    "TransparenceLogo":0
}

const statics = nodecg.Replicant('statics', 'connector');
// const dynamics = nodecg.Replicant('dynamics', 'connector');

const timeReplicant = nodecg.Replicant('time')
const time_startReplicant = nodecg.Replicant('time_startReplicant')

const showLeaderboard_lead = nodecg.Replicant('showLeaderboard_Lead')
const showWodDetails = nodecg.Replicant('showWodDetails')

const laneInfos = nodecg.Replicant('laneInfos')
const laneShow = nodecg.Replicant('laneShow',{defaultValue:false})
const ParticipantsWod = nodecg.Replicant('ParticipantsWod','connector');

const videoInfos = nodecg.Replicant('videoInfos','leaderboard')
const videoShow = nodecg.Replicant('videoShow','leaderboard')

const showLogo = nodecg.Replicant('showLogo')
const showChrono = nodecg.Replicant('showChrono')
const FVReplicant = nodecg.Replicant('FVspot')
const LogoFVFixe = nodecg.Replicant('LogoFVFixe')

const showManuel = nodecg.Replicant('showManuel')

const sponsorLower = nodecg.Replicant('assets:sponsorLower')
const events = nodecg.Replicant('assets:events')

const Teams = nodecg.Replicant('Teams')

const Att_poids = nodecg.Replicant('Att_poids')

const Ft_Ap = nodecg.Replicant('fortime_amrap')

const winEvents = nodecg.Replicant('winEvents')
const ShowRow = nodecg.Replicant('ShowRow')

var participantEvent = {}
var participantsCurrentHeats = {}
var currentHeat = {}
var Att_poids_sub = []
var lowerThird = []


sponsorLower.on('change', (newValue)=> {
    resetSelectSponsor(newValue)
    // A revoir
})


statics.on('change', (newValue, oldValue) => {
    console.log("static = ", newValue)
    console.log("ParticipantsWod = ", ParticipantsWod.value)
    resetSelect(newValue);
}); 

events.on('change', (newValue, oldValue)=>{
    if (newValue.length > 0){
        if (newValue != oldValue){
            $.getJSON( newValue[0].url, function( data ) {
                tableEvent = data.events;
                var $list = $('#tableEvents');
                data.events.forEach((element)=>{
                    // tableWeight.push(element.score)
                    var $item = $(
                        '<tr class="" id="'+element.id+'">' +
                            '<td id="number">EVENT ' +element.id+ '</td>'+
                            '<td id="Name">' +element.name+ '</td>'+
                            '<td id="score"><select id="'+element.id+'_gauche"> <input type="checkbox" id="check_'+element.id+'_gauche"><label for="'+element.id+'">DOUBLE</label></td>'+
                            '<td id="score"><select id="'+element.id+'_droite"> <input type="checkbox" id="check_'+element.id+'_droite"><label for="'+element.id+'">DOUBLE</label></td>'+
                            // '<td id="win"><input type="checkbox" onclick="toggleCheckboxGauche(this)" id="'+element.id+'"></td>'+
                            // '<td id="loose"><input type="checkbox" onclick="toggleCheckboxDroite(this)" id="'+element.id+'"></td>'+
                        '</tr>'
                    )
                    $list.append($item)

                    if (element.scores){
                        var gauche = document.getElementById(element.id+'_gauche')
                        var droite = document.getElementById(element.id+'_droite')

                        //Create option Null

                        var opt = document.createElement('option')
                        opt.value = 0
                        opt.innerHTML = "-"
                        gauche.appendChild(opt)

                        var opt = document.createElement('option')
                        opt.value = 0
                        opt.innerHTML = "-"
                        droite.appendChild(opt)


                        console.log(element.scores)

                        Object.keys(element.scores[0]).forEach((d)=>{
                            // console.log(d)
                            var opt = document.createElement('option')
                            opt.value = element.scores[0][d]
                            opt.innerHTML = d.toUpperCase()
                            droite.appendChild(opt)
                            var opt = document.createElement('option')
                            opt.value = element.scores[0][d]
                            opt.innerHTML = d.toUpperCase()
                            gauche.appendChild(opt)
                            console.log(element.scores[0][d])
                        })
                    }
                })
              });
        }
    }
})


function actScore(){
    var optleft=[];
    var valleft = [];
    var optright=[];
    var valright = [];

    for(let i = 1; i <= tableEvent.length ; i++){
        optleft[i] = $("#"+i+"_gauche :selected").text()
        optright[i] = $("#"+i+"_droite :selected").text()


        // console.log($("#check_"+i+"_gauche").is(":checked"))
        // console.log($("#check_"+i+"_droite").is(":checked"))
        if($("#check_"+i+"_gauche").is(":checked")){
            valleft[i] = $("#"+i+"_gauche :selected").val() * 2
            optleft[i] = 'TW'
        }
        else{
            valleft[i] = $("#"+i+"_gauche :selected").val()
        }

        if($("#check_"+i+"_droite").is(":checked")){
            valright[i] = $("#"+i+"_droite :selected").val() * 2
            optright[i] = 'TW'
        }
        else{
            valright[i] = $("#"+i+"_droite :selected").val()
        }

    }
    var win = [];
    console.log(Teams.value[0])
    console.log(Teams.value[1])
    win[Teams.value[0]] = {"texte":[], "score":[]}
    win[Teams.value[1]] = {"texte":[], "score":[]}
    win[Teams.value[0]].texte = optleft ;
    win[Teams.value[1]].texte = optright ;
    win[Teams.value[0]].score = valleft ;
    win[Teams.value[1]].score = valright ;
    winEvents.value = win
}

nodecg.listenFor('connection', 'connector', value => {
    ConnectionLeaderboard.value = value;
})

function actualiserLogo(){
    var select = document.getElementById('logo-select');
    select.innerHTML = "";
    logoEvent.value.forEach((element, index) => {
        var opt = document.createElement('option')
        opt.value = element.url
        opt.innerHTML = element.name
        select.appendChild(opt)
    })
}

function Actualiser(){
    showLogo.value = document.getElementById("logo").checked;
    showManuel.value = document.getElementById("Manual").checked;
    showWodDetails.value = document.getElementById("showWod").checked;
    showChrono.value = document.getElementById("showChrono").checked;    
    showLeaderboard_lead.value = document.getElementById("showLeader").checked;
    Ft_Ap.value = document.getElementById("fortime_amrap").checked;
    ShowRow.value = document.getElementById('Rameur').checked;

    var team1 = document.getElementById("leftTeam").value;
    var team2 = document.getElementById("rigthTeam").value;
    Teams.value = [team1,team2]
    console.log(statics.value.athletes[team1])
    $('#teamGauche').text(statics.value.athletes[team1].displayName.toUpperCase())
    $('#teamDroite').text(statics.value.athletes[team2].displayName.toUpperCase())

    console.log(Teams.value)
}

function functionFV(){
    if (FVReplicant.value != true){
        FVReplicant.value = true;
    }
    console.log(document.getElementById("LogoFvFixe").checked);
    if (!document.getElementById("LogoFvFixe").checked){
        setTimeout(function(){  
            FVReplicant.value = false; }, 10000);
    }
}

const videoAth = nodecg.Replicant('assets:ath', 'leaderboard');

videoAth.on('change', (newValue)=>{
    resetVideo(newValue)
})



nodecg.readReplicant('showLogo', (value) =>{
    document.getElementById('logo').checked = value
})

nodecg.readReplicant('showChrono', (value) =>{
    document.getElementById('showChrono').checked = value
})

nodecg.readReplicant('showWodDetails', (value) =>{
    document.getElementById('showWod').checked = value
})

nodecg.readReplicant('showLeaderboard_Lead', (value) =>{
    document.getElementById('showLeader').checked = value
})

nodecg.readReplicant('showManuel', (value) =>{
    document.getElementById('Manual').checked = value
})

nodecg.readReplicant('fortime_amrap', (value) =>{
    document.getElementById('fortime_amrap').checked = value
})


function resetVideo(data){
    try{        
        // ! On prend le tableau 
        
        var $lane = $("#lane__video")
        $lane.find(".lane_V").remove();

        var i=0;
        for(let video of data){
            console.log(video)
            var $item = $(
                '<div class="lane_V">' + 
                    '<div class="">' + video.name  + '</div>' + 
                    '<button class="button_lane" onclick="affichageVideo()" id='+i+'>' + "Afficher" + '</button>' +
                '</div>'
            );
            // athlete.$item = $item;
            $lane.append($item)
            i++
        }

    }
    catch(e){
        console.log(e)
    }
}


function affichageVideo() {
    console.log(event.target)
    console.log(videoAth.value[event.target.id].url)
    videoInfos.value = videoAth.value[event.target.id].url;
    videoShow.value = true;
    $(".button_lane").attr('disabled', true);
    setTimeout(function(){ 
        $(".button_lane").attr('disabled', false);
        videoShow.value = false; 
    }, 4000);
}