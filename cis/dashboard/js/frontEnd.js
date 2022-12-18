

function updateFront(data){
    let $tab = $("#cis")
    $tab.find(".cueCardParents").remove();
    
    Object.values(data).forEach(( val, index ) => {
        console.log(val)
        if(val != null ){
            let $item = $( 
                '<div class="cueCardParents" >' + 
                    '<h3 class="lane name">#'+ val.lane +" - "+ val.displayName +'</h3>' + 
                    '<div> '+
                        '<span class="lane name" id="overallRank_'+val.lane+'">Overall Rank : '+ val.overallStanding +' </span> '+
                        '<span class="lane name" id="overallPoints_'+val.lane+'"> Overall Points : '+ val.overallPoints +'</span>' + 
                    '</div>' +
                    '<div> '+
                        '<h4> Lowerthird selection </h4>' +
                    '</div>' +
                    '<div> '+
                        '<label for="position">Choose your lowerthirds</label>' +
                        '<select id="subtype'+val.lane+'" class="subtype">' +
                            '<option value="affiliation">Affiliation</option>' +
                            '<option value="athletes">Athlete(s)</option>' +
                            // '<option value="benchmarks">Benchmarck</option>' +
                            '<option value="wods">Wod results</option>' +
                            '<option value="overall">X overall standing after X events</option>' +
                        '</select>' +
                    '</div>' +
                    '<div class="input-checkbox">' +
                        '<input type="checkbox" id="ath_' + val.lane + '" onclick="askAffichage()"/>' + 
                        '<span class="toogle"></span>' +
                    '</div>' +
                    // '<button class="button_lane" style="width:100%" onclick="affichageLane()" id='+val.lane+'>' + "Afficher DATA TEAM" + '</button>' +
                    '<br>'+'<br>'+
                    // '<button class="button_lane" style="width:100%" onclick="affichageAthDetails()" id='+val.lane+'>' + "Afficher Data team + Athlètes" + '</button>' +
                    '<div class="cards-list workout_list" id="workouts_'+ val.lane+'"/>' +

                    // '<button class="button_lane" style="width:100%" onclick="affichageWod()" id='+val.lane+'>' + "Afficher DATA WOD" + '</button>' +
                    '<br>'+'<br>'+
                    '<div class="cards-list" id="cards_'+val.lane+'"/>' +
                '</div>'
            );
            $tab.append($item);

            updateFrontWorkout(val.workoutRank, val.lane)

            let $tab_elm = $("#cards_"+val.lane)

            val.ath.forEach((ath, key) => {

                let age = ath.age != undefined ? ath.age : '-'
                let height = ath.height != undefined ? ath.height : '-'
                let weight = ath.weight != undefined ? ath.weight : '-'
                let avatarPath = ath.avatarPath != undefined ? ath.avatarPath : ''

                let $item_ath = $( 
                    '<div class="card-item" id="lane_'+ val.lane +'_aht_'+ key +'">' +
                        '<div class="card">'+
                            '<div class="card-item">'+
                                '<div class="card__athlete__avatar" style="background-image:url(' + avatarPath + ')">' +
                                        // '<i class="material-icons"></i>' +
                                '</div>' +
                                '<div class="card__athlete__name">' +
                                    '<h3>'+ ath.fullName +'</h3>' +
                                    '<div>' + ath.crossfitAffiliateName + '</div>' +
                                '</div>' +
                            '</div>'+
                            '<div class="card__info">' +
                                '<div class="card__info__age" id="age">' + age +
                                '</div>' +
                                '<div class="card__info__height" id="height">' + height +
                                '</div>' +
                                '<div class="card__info__weight" id="weight">' + weight +
                                '</div>' +
                            '</div>' +

                            '<button class="button_lane" style="width:100%" onclick="affichageAthDetails()" id=Lower_ath_'+val.lane+'_aht_'+ key +'>' + "Afficher Lower third détails" + '</button>' +
                        '</div>' +
                    '</div>'
                );

                $tab_elm.append($item_ath)

            })

        }
    })
}


function updateFrontWorkout(workouts, lane){

    var $tab_workouts = $("#workouts_"+lane)
    $tab_workouts.find(".wodRank").remove()

    workouts.forEach(wod=>{
        var $item_wod = $( 
            '<div class="card__wod wodRank">' +
                '<div class="text-nowrap text-truncate text-left card_info_workoutName">' +
                    wod.name +
                '</div>' +
                '<div class="card_info_workoutRank">' +
                    'N° '+ wod.rank +
                '</div>' +
                '<div class="card_info_workoutResult">' +
                    wod.result +
                '</div>' +
            '</div>'
        );
        $tab_workouts.append($item_wod)
    })
}
