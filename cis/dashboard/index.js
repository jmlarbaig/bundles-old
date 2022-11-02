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

const eventId = nodecg.Replicant('eventId', 'connector');

const token = nodecg.Replicant('TOKEN','connector');
const listeAthlete = nodecg.Replicant('listeAthlete', 'connector')
const laneAthInfos = nodecg.Replicant('laneAthInfos');
const laneInfos = nodecg.Replicant('laneInfos')
const laneShow = nodecg.Replicant('laneShow')
const laneWods = nodecg.Replicant('laneWods')
const laneAth  = nodecg.Replicant('laneAth')

const statics = nodecg.Replicant('statics', 'connector');
const dynamics = nodecg.Replicant('dynamics', 'connector');

let liste_heat = []
let liste_heat_ath = []
var athletes = []
var heatInfos = []
var liste_donnees = {'Team':[], 'Individual':[]}

    statics.on('change', (newValue, oldValue) => {
        // console.log("CIS ", newValue)
        if(newValue != undefined){
            updateHeat(newValue)
            if(newValue.athletes != undefined ){
                athletes = newValue.athletes
                updateCIS()
            }

        }
    })

    listeAthlete.on('change', (newValue, oldValue) => {
        // console.log("listeAthlete ", newValue)
            if(newValue != oldValue ){
                // updateAthInfos(newValue)
                dataTreatment(newValue)
                athletes.length != 0 ? updateCIS() : ''
            }
        })

    const TopScore = nodecg.Replicant('TopScore', 'connector')

    TopScore.on('change', (newValue, oldValue)=>{
        console.log("top Score = ",newValue)
        // console.log("top Score = ",newValue[0][0].scores[0].score)
        if (newValue != undefined){
            let index=0;
            if (!newValue[0].hasOwnProperty('error')){
                for (let teams of newValue[0]){
                        console.log("top index =", teams)
                        var $list = $(".repTarget_Team");
                        teams.scores.forEach((team, index)=>{
                            var $item = $(
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
    