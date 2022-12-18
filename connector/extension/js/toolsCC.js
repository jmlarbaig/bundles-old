
module.exports = (nodecg, Connected) => {
    
    let athletesCurrentHeat = null;
    let athletesDataCC = null;

    // const listeAthlete = nodecg.Replicant('listeAthlete', { defaultValue: {'Team':[], 'Individual':[]}, persistent: false })
    const listCis = nodecg.Replicant('CIS', { defaultValue: {}, persistent: true })
    const planningEvent = nodecg.Replicant('planningEvent')

    require('./assetCC')(nodecg)
    const cc = require('./services/cc_api')()
    const warmup = require('./warmup')(nodecg, cc)

    // Data from Competition Corner
    const affiliateStats = nodecg.Replicant('affiliateStats')
    const Divisions = nodecg.Replicant('Divisions')
    const eventId = nodecg.Replicant('eventId', { defaultValue: 0, persistent:false})
    const TopScore = nodecg.Replicant('TopScore')
    const WorkoutInfos = nodecg.Replicant('WorkoutInfos');
    const token = nodecg.Replicant('TOKEN', { defaultValue: null, persistent:false});

    function connectionCC(user, passwd, event){
            cc.logCC(user, passwd).then((_token_)=>{
                Connected.value.cc = 'connected'
                token.value = _token_
                cc.dashboardEventCC(event).then((res) => {
                    const {id, name, affiliates, divisions} = res
                    affiliateStats.value = affiliates
                    Divisions.value = divisions
                    eventId.value = id
                })
                cc.loadWorkouts(event).then(data => {
                    WorkoutInfos.value = data
                })
                cc.loadWorkoutsPlanning(event).then((data)=>{
                    for(let wod of data.workouts){
                        cc.loadHeats(wod.id).then((data)=>{
                            wod.heats = data
                        }).then(()=>{
                            cc.loadParticpant(event, wod.id).then((data)=>{
                                wod.participants = data
                            }).then(()=>{
                                planningEvent.value = data
                            })
                        })
                    }
                })
            }).catch(e => {
                Connected.value.cc = 'error : ' + e
            })
    }

    nodecg.listenFor('static_update', value => {
        console.log('static_update')
        athletesCurrentHeat = value.athletes

        if(token.value != null){
            if(value.workoutId != 0 && value.athletes.length > 0){
                updateScoreToBeat(value.workoutId, value.athletes)
            }
            if(value.athletes.length > 0 && athletesDataCC != null){
                updateCIS(athletesDataCC, value.athletes)
            }
            if(value != undefined){
                warmup.updateWorkout(value)
            }
        }else{

        }
    })

    nodecg.listenFor('liste_ath_cc_update', value => {
        athletesDataCC = value
        if(athletesCurrentHeat != null && token.value != null){
            updateCIS(value, athletesCurrentHeat)
        }
    })

    async function updateScoreToBeat(workoutId, athletes){
        let divisionName = [];
        let divisionId = [];
        athletes.forEach(function(athlete){
            if( !divisionName.includes(athlete.division) ){
                divisionName.push(athlete.division)
            }
        });

        for (let division of divisionName){
            let div = Divisions.value.find( element => element.title === division)
            divisionId.push(div)
        }
        let result = []
        for (let element of divisionId){
            if (element != undefined){
                cc.getHeatsTopScore(workoutId, element.id).then((res)=>{
                    result.push(res)
                    TopScore.value = result
                })
            }
        }
    }

    async function updateCIS(liste_cc, athletes){
        let listeCurrentHeat = []
        let listeCurrentHeat_ath = []
        athletes.forEach(val => {  
            if(val != undefined){

                if (liste_cc.Team.hasOwnProperty(val.displayName) && !listeCurrentHeat.includes(val.lane)){
                    // listeCurrentHeat[val.lane] = 1
                    listeCurrentHeat[val.lane] = {'ath':[]}
                    listeCurrentHeat[val.lane].ath = liste_cc.Team[val.displayName]
                    listeCurrentHeat[val.lane].type = 'team'
                    listeCurrentHeat[val.lane].lane = val.lane
                    listeCurrentHeat[val.lane].displayName = val.displayName
                    listeCurrentHeat[val.lane].countryCode = val.countryCode
                    listeCurrentHeat[val.lane].affiliate = val.affiliate 
                    listeCurrentHeat[val.lane].division = val.division
                    listeCurrentHeat[val.lane].overallPoints = val.overallPoints 
                    listeCurrentHeat[val.lane].rank = val.rank
                }
                else if (liste_cc.Individual.hasOwnProperty(val.displayName) && !listeCurrentHeat.includes(val.lane)){
                    // listeCurrentHeat[val.lane].ath = 1
                    listeCurrentHeat[val.lane] = {'ath':[]}
                    listeCurrentHeat[val.lane].ath = liste_cc.Individual[val.displayName]
                    listeCurrentHeat[val.lane].type = 'individual'
                    listeCurrentHeat[val.lane].lane = val.lane
                    listeCurrentHeat[val.lane].displayName = val.displayName
                    listeCurrentHeat[val.lane].countryCode = val.countryCode
                    listeCurrentHeat[val.lane].affiliate = val.affiliate 
                    listeCurrentHeat[val.lane].division = val.division
                    listeCurrentHeat[val.lane].overallPoints = val.overallPoints 
                    listeCurrentHeat[val.lane].rank = val.rank
                }

                if(listeCurrentHeat[val.lane] != undefined){
                    let participantId = parseInt(listeCurrentHeat[val.lane].ath[0]['Participant ID'])
                    // console.log(eventId.value)

                    cc.loadParticpantId(eventId.value, participantId).then((result)=>{
                        listeCurrentHeat[val.lane].overallStanding = result.overallStanding
                        listeCurrentHeat[val.lane].workoutRank = [{}]
                        listeCurrentHeat[val.lane].workoutRank = result.workoutRanks
                        listeCurrentHeat[val.lane].affiliate = result.affiliate
    
                        listeCurrentHeat_ath[val.lane] = {'ath_infos':[]}
    
                        listeCurrentHeat[val.lane].ath.forEach((ath, index)=>{
                            let alias = (ath['First Name'].toLowerCase() + ' ' + ath['Last Name'].toLowerCase()).replaceAll(' ', '-')
    
                            let ath_infos = {}
    
                            cc.loadAthlete(alias).then((result) => {
                                if(result.error == 'Athlete not found'){
                                    ath_infos.fullName = ath['First Name'] + ' ' + ath['Last Name'];
                                    ath_infos.crossfitAffiliateName = ath['Affiliate'];
                                    listeCurrentHeat_ath[val.lane].ath_infos[index] = {...ath_infos}
                                }else{
                                    listeCurrentHeat_ath[val.lane].ath_infos[index] = {...result}
                                }
                                listeCurrentHeat[val.lane].ath = listeCurrentHeat_ath[val.lane].ath_infos;
                                listCis.value = listeCurrentHeat;
                            })
                        })
                    })
                }
            }
        })
    }

    return {connectionCC}


}
