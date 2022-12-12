

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
                    '<div class="cards-list workout_list" id="workouts_'+ val.lane+'"/>' +
                    '<div class="cards-list" id="cards_'+val.lane+'"/>' +
                '</div>'
            );
            $tab.append($item);

            let $tab_elm = $("#cards_"+val.lane)

            val.ath.forEach((d, key) => {

                let back_squat = d.hasOwnProperty('Back Squat') ? d['Back Squat'] : '-'
                let clean_jerk = d.hasOwnProperty('Clean&Jerk') ? d['Clean&Jerk'] : '-'
                let deadlift = d.hasOwnProperty('Deadlift') ? d['Clean&Jerk'] : '-'
                let snatch = d.hasOwnProperty('Snatch') ? d['Snatch'] : '-'

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
                            '<div class="card__benchmark">' +
                                '<ul class="list-unstyled">' +
                                    '<li>' +
                                        '<div class="card__benchmark__key">' +
                                            'back squat' +
                                        '</div>' +
                                        '<div class="card__benchmark__val" id="back_squat">' +
                                            back_squat +
                                        '</div>' +
                                    '</li>' +
                                    '<li>' +
                                        '<div class="card__benchmark__key">' +
                                            'Clean &amp; Jerk' +
                                        '</div>' +
                                        '<div class="card__benchmark__val" id="clean_jerk">' +
                                            clean_jerk +
                                        '</div>' +
                                    '</li>' +
                                    ' <li>' +
                                        '<div class="card__benchmark__key">' +
                                            'Deadlift' +
                                        '</div>' +
                                        '<div class="card__benchmark__val" id="deadlift">' +
                                            deadlift+
                                        '</div>' +
                                    '</li>' +
                                    '<li>' +
                                        '<div class="card__benchmark__key">' +
                                            'Snatch' + 
                                        '</div>' +
                                        '<div class="card__benchmark__val" id="snatch">' +
                                            snatch +
                                        '</div>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>'+ 
                            '<div class="card__benchmark" id="lastEvents_'+val.lane+'_aht_'+ key +'">' +
                                '<ul class="list-unstyled" id=""Events_'+val.lane+'_aht_'+ key +'"">' +

                                '</ul>' +
                            '</div>'+ 
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

    if(ath.benchmarks != undefined){
        $tab_ath.find('#clean_jerk').text(ath.benchmarks.cleanJerk)
        $tab_ath.find('#snatch').text(ath.benchmarks.snatch)
        $tab_ath.find('#deadlift').text(ath.benchmarks.deadlift)
        $tab_ath.find('#back_squat').text(ath.benchmarks.backsquat)
    }
    
    $tab_ath.find('.list_events').remove()

    if(ath.latestEvents != undefined && ath.latestEvents.length > 0){
        ath.latestEvents.forEach(events => {
            let $items = $( 
                '<div class="card__wod wodRank list_events">' +
                    '<div class="text-left card_info_workoutName">' +
                    events.eventName +
                    '</div>' +
                    '<div class="card_info_workoutRank">' +
                        'N° '+ events.rank +
                    '</div>' +
                    '<div class="card_info_workoutResult">' +
                    events.division +
                '</div>' +
            '</div>'
            )
            $tab_ath.find('#lastEvents_'+lane+'_aht_'+ index).append($items)
        })
    }
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
