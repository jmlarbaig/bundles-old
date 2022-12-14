

function updateFront(data){
    let $tab = $("#cis")
    $tab.find(".cueCardParents").remove();
    
    $.each( data, function( key, val ) {
        if(val != undefined ){
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

            let $tab_elm = $("#cards_"+val.lane)

            val.ath.forEach((d, key) => {

                let $item_ath = $( 
                    '<div class="card-item" id="lane_'+ val.lane +'_aht_'+ key +'">' +
                        '<div class="card">'+
                            '<div class="card-item">'+
                                '<div class="card__athlete__avatar" style="background-image:url()">' +
                                        // '<i class="material-icons"></i>' +
                                '</div>' +
                                '<div class="card__athlete__name">' +
                                    '<h3>'+ d['First Name'] + ' ' +  d['Last Name'] +'</h3>' +
                                    '<div>' + d['Affiliate'] + '</div>' +
                                '</div>' +
                            '</div>'+
                            '<div class="card__info">' +
                                '<div class="card__info__age" id="age">' +' - '+
                                '</div>' +
                                '<div class="card__info__height" id="height">' +' - '+
                                '</div>' +
                                '<div class="card__info__weight" id="weight">' +' - '+
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

function updateFrontAth(ath, lane, index){
    // console.log('index =', index)
    let $tab_ath = $("#lane_"+ lane +"_aht_"+ index)
    // console.log("Age :",ath.age)
    ath.age != undefined ? $tab_ath.find('#age').text(ath.age ) : $tab_ath.find('#age').text( '-' )
    ath.height != undefined ? $tab_ath.find('#height').text(ath.height + "cm") :  $tab_ath.find('#height').text("-")
    ath.weight != undefined ? $tab_ath.find('#weight').text(ath.weight + "kg") : $tab_ath.find('#weight').text("-")
    ath.avatarPath != undefined && $tab_ath.find('.card__athlete__avatar').css("background-image", "url(" + ath.avatarPath + ")")

}

function updateFrontWorkout(liste, lane){

    var $tab_workouts = $("#workouts_"+lane)
    $tab_workouts.find(".wodRank").remove()

    $('#overallRank_'+lane).html("Overall Rank : " + liste.overallStanding)
    $('#overallPoints_'+lane).html("Overall Points : " + liste.overallPoints)


    liste.workoutRank.forEach(wod=>{
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
