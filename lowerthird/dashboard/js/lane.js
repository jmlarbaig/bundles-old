
var affiliateTimer = undefined
var repTobeat = 0;
var typeWod_G = undefined

var athletes_divison = {}

var currentMvt = undefined;

function resetLane(data){
    try{        
        // ! On prend le tableau
        
        var $lane = $("#lane__Content")
        $lane.find(".lane_C").remove();

        for(let athlete of data.athletes){
            // console.log(athlete)
            var $item = $(
                '<div class="lane_C">' + 
                    '<div class="rank">0. ' + athlete.rank  + '</div>' + 
                    '<div class="lane">Lane '+ athlete.lane + '</div>' + 
                    '<div class="name text-nowrap text-truncate" style="width:100px;">' + athlete.displayName + '</div>' + 
                    '<div class="aff text-nowrap text-truncate">' + athlete.affiliate  + '</div>' + 
                    '<div class="div text-nowrap text-truncate">'+ athlete.division + '</div>' + 
                    '<div class="points">' + athlete.overallPoints + ' Points</div>' +
                    '<button class="button_lane" onclick="affichageLane()" id='+athlete.lane+'>' + "Afficher" + '</button>' +
                '</div>'
            );
            $lane.append($item)
        }

    }
    catch(e){
        console.log(e)
    }
}

async function affichageLane() {
    laneInfos.value = currentHeat.participants.find(elt => elt.id == 
        participantsCurrentHeats.stations.find(element => element.station == event.target.id).participantId);

        // console.log(participantsCurrentHeats.stations.find(element => element.station == event.target.id))

    laneInfos.value.avatarPath = (participantsCurrentHeats.stations.find(element => element.station == event.target.id).avatarPath);
    laneInfos.value.aff = participantsCurrentHeats.stations.find(element => element.station == event.target.id).affiliate;
    
    // console.log("lane infos = ", laneInfos.value)

    laneShow.value = true;
    $(".button_lane").attr('disabled', true);
    setTimeout(function(){ 
        $(".button_lane").attr('disabled', false);
        laneShow.value = false; 
    }, 4000);
}
