const athletes_infos = {
    "First Name": "",
    "Last Name": "",
    "Gender": "",
    "Affiliate": "",
    "Division": "",
    "Team Name": "",
    "Captain": "",
    "Format": "",
    "Clean&Jerk": "",
    "Snatch": "",
    "Deadlift": "",
    "Back Squat": "",
    "Crossfit Total": "",
    "Max Pullup": "",
    "Fight Gone Bad": "",
    "Fran": "",
    "Helen": "",
    "Grace": "",
    "Filthy 50": "",
    "Sprint 400m": "",
    "2K Row": "",
    "Run 5K": "",
    "Participant ID": ""
}

let eventId;
let liste_heat = []
let liste_heat_ath = []
let athletes = []
let heatInfos = []
let liste_donnees = {'Team':[], 'Individual':[]}

const listeAthlete = nodecg.Replicant('listeAthlete', 'connector')
const listCis = nodecg.Replicant('CIS')

const lowerThirdData = nodecg.Replicant('lowerThirdData', 'lowerthird')


// Destructuration du fichier static
const eventInfos = nodecg.Replicant('eventInfos', 'connector');
const s_athletes = nodecg.Replicant('s_athletes', 'connector');


    eventInfos.on('change',(newValue, oldValue)=>{
        eventId = newValue.eventId;
    })

    s_athletes.on('change', (newValue, oldValue) => {
        // console.log("CIS ", newValue)
        if(newValue != undefined){
            athletes = newValue
            updateCIS()
        }
    })

    listeAthlete.on('change', (newValue, oldValue) => {
            if(newValue != oldValue ){
                dataTreatment(newValue)
                athletes.length != 0 && updateCIS()
            }
        })

    const TopScore = nodecg.Replicant('TopScore', 'connector')

    TopScore.on('change', (newValue, oldValue)=>{

        if (newValue!=undefined && newValue.length > 0){
            let index=0;
            if (!newValue[0].hasOwnProperty('error')){
                for (let teams of newValue[0]){
                        // console.log("top index =", teams)
                        let $list = $(".repTarget_Team");
                        $list.remove('span')
                        teams.scores.forEach((team, index)=>{
                            let $item = $(
                                '<span class="row">' +team.rank  + '-' + team.name + ' -> ' + team.score +'</span> '
                            )
                            $('.repTarget'+index).text("-> "+teams.scores[0].score)
                            $list.append($item)
                        })
                        index++
                }
            }
        }
    })
    