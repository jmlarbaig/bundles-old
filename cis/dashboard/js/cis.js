
    async function dataTreatment(data){
        var items = [];
        liste_donnees = {'Team':[], 'Individual':[]}
        await $.each( data, function( key, val ) {
            items[key] = Object.assign( {}, athletes_infos, val);
            if (val.Format == "Team"){
                var team_name = val['Team Name']
                if(team_name.includes('"')){
                    while(team_name.includes('"', -2)){
                        team_name=  team_name.replace('"', '')
                        // console.log(team_name)
                    }
                }
                if( !liste_donnees['Team'].hasOwnProperty(team_name) ){
                    liste_donnees['Team'][team_name] = []
                }
                liste_donnees['Team'][team_name].push(val)
            }
            else if (val.Format == "Individual"){
                var fullName = val['First Name']+ ' ' + val['Last Name']
                // console.log(fullName)
                liste_donnees['Individual'][fullName] = []
                liste_donnees['Individual'][fullName].push(val)
                // console.log(liste_donnees)
            }
        });
        console.log("Liste =",liste_donnees)
    }

    async function updateCIS(){
        liste_heat = []
        liste_heat_ath = []

        var $tab = $("#cis")
        $tab.find(".cueCardParents").remove();

        // console.log("Liste Heat = ", liste_heat)
        athletes.forEach(val => {  
            if(val != undefined){
                if (liste_donnees.Team.hasOwnProperty(val.displayName) && !liste_heat.includes(val.lane)){
                    // liste_heat[val.lane] = 1
                    liste_heat[val.lane] = {'ath':[]}
                    liste_heat[val.lane].ath = liste_donnees.Team[val.displayName]
                    liste_heat[val.lane].lane = val.lane
                    liste_heat[val.lane].displayName = val.displayName
                    liste_heat[val.lane].countryCode = val.countryCode
                    liste_heat[val.lane].affiliate = val.affiliate 
                    liste_heat[val.lane].division = val.division
                    liste_heat[val.lane].overallPoints = val.overallPoints 
                    liste_heat[val.lane].rank = val.rank
                }
                else if (liste_donnees.Individual.hasOwnProperty(val.displayName) && !liste_heat.includes(val.lane)){
                    // liste_heat[val.lane].ath = 1
                    liste_heat[val.lane] = {'ath':[]}
                    liste_heat[val.lane].ath = liste_donnees.Individual[val.displayName]
                    liste_heat[val.lane].lane = val.lane
                    liste_heat[val.lane].displayName = val.displayName
                    liste_heat[val.lane].countryCode = val.countryCode
                    liste_heat[val.lane].affiliate = val.affiliate 
                    liste_heat[val.lane].division = val.division
                    liste_heat[val.lane].overallPoints = val.overallPoints 
                    liste_heat[val.lane].rank = val.rank
                }
            }
        })
        // console.log("Liste Heat = ", liste_heat)
        updateFront(liste_heat);
        await updateWorkout(liste_heat)

    }

    function updateFront(data){
        // console.log("Data = ", data)
        var $tab = $("#cis")
        $tab.find(".cueCardParents").remove();
        
        $.each( data, function( key, val ) {
            // console.log("Front = ", key)
            if(val != undefined ){
                var $item = $( 
                    '<div class="cueCardParents" >' + 
                        '<h3 class="lane name">#'+ val.lane +" - "+ val.displayName +'</h3>' + 
                        '<div> '+
                            '<span class="lane name" id="overallRank_'+val.lane+'">Overall Rank : '+ val.overallStanding +' </span> '+
                            '<span class="lane name"> Overall Points : '+ val.overallPoints +'</span>' + 
                        '</div>' +
                        '<button class="button_lane" style="width:100%" onclick="affichageLane()" id='+val.lane+'>' + "Afficher DATA TEAM" + '</button>' +
                        '<br>'+'<br>'+
                        '<button class="button_lane" style="width:100%" onclick="affichageAthDetails()" id='+val.lane+'>' + "Afficher Data team + Athlètes" + '</button>' +
                        '<div class="cards-list workout_list" id="workouts_'+ val.lane+'"/>' +
                        '<button class="button_lane" style="width:100%" onclick="affichageWod()" id='+val.lane+'>' + "Afficher DATA WOD" + '</button>' +
                        '<div class="cards-list" id="cards_'+val.lane+'"/>' +
                    '</div>'
                );
                $tab.append($item);

                var $tab_elm = $("#cards_"+val.lane)

                val.ath.forEach((d, key) => {
                    // console.log("data_ath = ", d)

                    let back_squat = d.hasOwnProperty('Back Squat') ? d['Back Squat'] : '-'
                    let clean_jerk = d.hasOwnProperty('Clean&Jerk') ? d['Clean&Jerk'] : '-'
                    let deadlift = d.hasOwnProperty('Deadlift') ? d['Clean&Jerk'] : '-'
                    let snatch = d.hasOwnProperty('Snatch') ? d['Snatch'] : '-'

                    var $item_ath = $( 
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
                                '<button class="button_lane" style="width:100%" onclick="affichageAthDetails()" id=Lower_ath_'+val.lane+'_aht_'+ key +'>' + "Afficher Lower third détails" + '</button>' +
                                '<button class="button_lane" style="width:100%" onclick="affichageEvent()" id=Event_'+val.lane+'_aht_'+ key +'>' + "Afficher Liste Event" + '</button>' +
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

    var ath_infos_bis = {
        'teamName':'',
        'benchmark':[],
        'affiliate':"",
        'fullName':"",
        'accountId':0,
        'sponsors':[],
        'latestEvents': [],
        'instagram':"",
        'avatarPath':"",
        'weight':"",
        'height':"",
        'age':""
    }

    var liste_athlete_full = []

    function updateAthInfos(athletes){
        // console.log("Athletes updAth=", athletes)
        athletes.forEach((ath,index) => {
            let alias = (ath['First Name'].toLowerCase() + ' ' + ath['Last Name'].toLowerCase()).replaceAll(' ', '-')
            let team_name = ath['Team Name']
            // console.log("alias =", alias)
            loadAthlete(alias).then(function(result){
                console.log("result = ", result)
                let at = ath_infos_bis
                at.teamName = team_name
                // at.affiliate = result.crossfitAffiliateName
                at.fullName = result.fullName
                at.benchmark = result.benchmark
                at.accountId = result.accountId
                at.sponsors = result.sponsors
                at.latestEvents = result.latestEvents
                at.instagram = result.instagram
                at.avatarPath = result.avatarPath
                at.weight = result.weight
                at.height = result.height
                at.age = result.age
                // liste_athlete_full[index] = at
                // console.log("liste_athlete_full index= ", index)
                console.log("liste_athlete_full = ", at)

            })
            .catch(err => { console.log(err) })
        })

    }

    var ath_infos = {
        'sponsors':[],
        'latestEvents': [],
        'instagram':"",
        'avatarPath':"",
        'weight':"",
        'height':"",
        'age':"",
        'benchmark':[],
    }

    function updateAth(athletes, lane){
        // console.log("Athletes updAth=", athletes)
        liste_heat_ath[lane] = {'ath_infos':[]}
        athletes.forEach((ath,index) => {
            let alias = (ath['First Name'].toLowerCase() + ' ' + ath['Last Name'].toLowerCase()).replaceAll(' ', '-')
            // console.log("alias =", alias)
            loadAthlete(alias).then(function(result){
                console.log("result = ", result)
                // console.log("ath = ", ath)
                // ath.sponsors = [{}]
                ath_infos.benchmarks = result.benchmarks
                ath_infos.sponsors = result.sponsors
                ath_infos.latestEvents = result.latestEvents
                ath_infos.instagram = result.instagram
                ath_infos.avatarPath = result.avatarPath
                ath_infos.weight = result.weight
                ath_infos.height = result.height
                ath_infos.age = result.age
                // console.log(index)
                liste_heat_ath[lane].ath_infos[index] = {...ath_infos}

                // console.log("Liste heat ath =",liste_heat_ath[lane].ath_infos[index])
            }).then(function(){
                // console.log("ath_infos = ",ath_infos)
                // console.log("liste_heat[lane] = ",liste_heat[lane])
                updateFrontAth(ath_infos, lane, index)
            })
            .catch(err => { console.log(err) })
        })

    }

    function updateFrontAth(ath, lane, index){
        // console.log('index =', index)
        var $tab_ath = $("#lane_"+ lane +"_aht_"+ index)
        // console.log("Age :",ath.age)
        ath.age != undefined ? $tab_ath.find('#age').text(ath.age ) : $tab_ath.find('#age').text( '-' )
        ath.height != undefined ? $tab_ath.find('#height').text(ath.height + "cm") :  $tab_ath.find('#height').text("-")
        ath.weight != undefined ? $tab_ath.find('#weight').text(ath.weight + "kg") : $tab_ath.find('#weight').text("-")
        ath.avatarPath != undefined ? $tab_ath.find('.card__athlete__avatar').css("background-image", "url(" + ath.avatarPath + ")") : ''

        if(ath.benchmarks != undefined){
            $tab_ath.find('#clean_jerk').text(ath.benchmarks.cleanJerk)
            $tab_ath.find('#snatch').text(ath.benchmarks.snatch)
            $tab_ath.find('#deadlift').text(ath.benchmarks.deadlift)
            $tab_ath.find('#back_squat').text(ath.benchmarks.backsquat)
        }
        
        $tab_ath.find('.list_events').remove()

        if(ath.latestEvents.length > 0){
            ath.latestEvents.forEach(events => {
                var $items = $( 
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

        // $tab_ath.find('#lastEvents'+lane ).hide()

        // if(ath.latestEvents.length > 0){
        //     $tab_ath.find('#past_event_0').text(ath.latestEvents[0].eventName + " - Rank : " + ath.latestEvents[0].rank + ' - Cat. : '+ ath.latestEvents[1].division)
        // }
    }

    function updateWorkout(liste_heat){
        // console.log("Upd Workout = ", liste_heat)
        liste_heat.forEach((val, index)=> {
            if(val != undefined){
                // console.log("Participant ID = ", parseInt(liste_heat[val.lane].ath[0]['Participant ID']))
                // console.log(eventId.value)
                loadParticpantId(eventId.value, parseInt(liste_heat[val.lane].ath[0]['Participant ID'])).then(function(result) {
                    liste_heat[val.lane].overallStanding = result.overallStanding
                    liste_heat[val.lane].workoutRank = [{}]
                    liste_heat[val.lane].workoutRank = result.workoutRanks
                    liste_heat[val.lane].affiliate = result.affiliate
                    // console.log(liste_heat[val.lane])
                }).then(function(){
                    updateFrontWorkout(liste_heat[val.lane], val.lane)
                }).then(function(){
                    updateAth(val.ath, val.lane)
                })
                .catch(err => { console.log(err) })
            }
        })

    }
    
    function updateFrontWorkout(liste, lane){

        // var $tab_ath = $("#cis")
        var $tab_workouts = $("#workouts_"+lane)
        $tab_workouts.find(".wodRank").remove()
        // console.log("Workout Rank =", liste.workoutRank)

        $('#overallRank_'+lane).html("Overall Rank : " + liste.overallStanding)


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

    async function loadParticpantId(eventId, id) {
        let response = await fetch("https://competitioncorner.net/api2/v1/events/"+ eventId + "/participants/"+ id , {
            method:"GET",
            headers:{'Authorization': 'Bearer ' + token.value}
        });
        let json = await response.json();
        return json;
    }

    async function loadAthlete(alias) {
        let response = await fetch("https://competitioncorner.net/api2/v1/accounts/athletepage/"+ alias , {
            method:"GET",
            headers:{'Authorization': 'Bearer ' + token.value}
        });
        let json = await response.json();
        return json;
    }

    async function affichageLane() {
        // console.log('target : ', event.target.id)
        // console.log("Search =",liste_heat)
        laneInfos.value = liste_heat[event.target.id]
    
        laneShow.value = true;
        $(".button_lane").attr('disabled', true);
        setTimeout(function(){ 
            $(".button_lane").attr('disabled', false);
            laneShow.value = false; 
        }, 5000);
    }

    async function affichageWod() {
        console.log('target : ', event.target.id)
        console.log("Search =",liste_heat[event.target.id])
        laneInfos.value = liste_heat[event.target.id]
        
    
        laneWods.value = true;
        $(".button_lane").attr('disabled', true);
        setTimeout(function(){ 
            $(".button_lane").attr('disabled', false);
            laneWods.value = false; 
        }, 5000);
    }

    async function affichageAthDetails(){
        console.log("List heat = ",liste_heat_ath[event.target.id])
        let infos_to_transfert = {...liste_heat[event.target.id], ...liste_heat_ath[event.target.id]}
        console.log("infos_to_transfert = ", infos_to_transfert)
        // laneAthInfos.value = liste_heat_ath[event.target.id]
        laneInfos.value = infos_to_transfert
    
        laneAth.value = true;
        $(".button_lane").attr('disabled', true);
        setTimeout(function(){ 
            $(".button_lane").attr('disabled', false);
            laneAth.value = false; 
        }, 5000);
    }

    async function affichageEvent(){
        console.log(document.getElementById(event.target.id))
        var ch = [] 
        ch = event.target.id.split('_')

            
        var $tab_ath = $("#lane_"+ch[1]+'_ath_'+ch[3])

        // console.log('#lastEvents_'+ ch[1]+'_ath_'+ch[3])
        $tab_ath.find('#lastEvents_'+ ch[1]+'_ath_'+ch[3]).hide()

        // setTimeout(function(){ 
        //     $(".button_lane").attr('disabled', false);
        //     laneShow.value = false; 
        // }, 4000);
    }