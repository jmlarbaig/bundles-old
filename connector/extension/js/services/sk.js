
const sha256 = require('sha256')
let staticJSONString = ''



async function getStatics(skStaticUrl, eventInfos, heatInfos, workoutInfo, s_athletes, Connected) {
    return fetch(skStaticUrl,{cache: "no-store"})
        .then((response)=>{
            return response.json()
        }).then((statics)=>{

            if(statics.eventId != undefined){
                let sameJson = (staticJSONString) == JSON.stringify(statics);
                if (sameJson) {
                    return
                }

                staticJSONString = JSON.stringify(statics);

                const {WorkoutInfo, heatInfo, athletes, ...rest} = statics

                eventInfos.value = rest
                heatInfos.value = heatInfo
                workoutInfo.value = WorkoutInfo
                s_athletes.value = athletes

                // updateScoreToBeat(statics.workoutId , statics.athletes);
                // updateNtp();
            }
        }).then(()=>{
            Connected.value.static = 'connected'
        })
        .catch((e)=>{
            console.log(e)
            Connected.value.static = 'error :' + e
        });
}

async function getDynamics(skDynamicUrl, statusHeat, d_athletes, Connected) {
    return fetch(skDynamicUrl, {cache: "no-store"})
        .then((response)=>{
            return response.json()
        }).then((dynamics)=>{

            if(dynamics.eventId != undefined){
                const {athletes, status, NtpTimeStart, ...rest} = dynamics

                // Insert des datas dans l'objet status
                statusHeat.value = {status, NtpTimeStart}
                
                // Insert des nouvelles datas des athletes
                d_athletes.value = athletes

            }
        }).then(()=>{
            Connected.value.dynamic = 'connected'
        })
        .catch((e)=>{
            console.log(e)
            console.log("error")
            Connected.value.dynamic = 'error :' + e
        })
}


module.exports = {
    getStatics,
    getDynamics
  };