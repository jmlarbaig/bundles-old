
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
    }

    async function updateCIS(){
        liste_heat = []

        let $tab = $("#cis")
        $tab.find(".cueCardParents").remove();

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
            })
            .catch(err => { console.log(err) })
        })

    }

    var ath_infos = {
        'fullName':'',
        'sponsors':[],
        'latestEvents': [],
        'instagram':"",
        'avatarPath':"",
        'weight':"",
        'height':"",
        'age':"",
        'benchmarks':{},
    }

    function updateAth(athletes, lane){
        // console.log("Athletes updAth=", athletes)
        liste_heat_ath[lane] = {'ath_infos':[]}
        athletes.forEach((ath,index) => {
            let alias = (ath['First Name'].toLowerCase() + ' ' + ath['Last Name'].toLowerCase()).replaceAll(' ', '-')
            loadAthlete(alias).then(function(result){
                if(result.error == 'Athlete not found'){
                    ath_infos.fullName = ath['First Name'] + ' ' + ath['Last Name'];
                    ath_infos.crossfitAffiliateName = ath['Affiliate'];
                    liste_heat_ath[lane].ath_infos[index] = {...ath_infos}
                }else{
                    liste_heat_ath[lane].ath_infos[index] = {...result}
                }
            }).then(function(){
                updateFrontAth(ath_infos, lane, index)
            })
            .catch(err => { console.log(err) })
        })

    }


    function updateWorkout(liste_heat){
        liste_heat.forEach((val, index)=> {
            if(val != undefined){
                loadParticpantId(eventId, parseInt(liste_heat[val.lane].ath[0]['Participant ID'])).then(function(result) {
                    liste_heat[val.lane].overallStanding = result.overallStanding
                    liste_heat[val.lane].workoutRank = [{}]
                    liste_heat[val.lane].workoutRank = result.workoutRanks
                    liste_heat[val.lane].affiliate = result.affiliate
                }).then(function(){
                    updateFrontWorkout(liste_heat[val.lane], val.lane)
                }).then(function(){
                    updateAth(val.ath, val.lane)
                })
                .catch(err => { console.log(err) })
            }
        })

    }
    