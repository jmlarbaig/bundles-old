
async function getStatics(skStaticUrl) {
    return fetch(skStaticUrl,{cache: "no-store"})
        .then((response)=>{
            return response.json()
        }).then((statics)=>{

            if(statics.eventId != undefined){
                let sameJson = sha256(staticJSONString) == sha256(JSON.stringify(statics));
                console.log(sameJson)
                if (sameJson) {
                    return
                }
                staticJSONString = JSON.stringify(statics);
                // statics.logoUrl = LogoImg.value

                const {WorkoutInfo, heatInfo, athletes, ...rest} = statics


                eventInfos.value = rest
                console.log('event in ok')
                heatInfos.value = heatInfo
                console.log('event in ok')
                workoutInfo.value = WorkoutInfo
                console.log('event in ok')
                s_athletes.value = athletes
                console.log('event in ok')

                // Statics.value = statics

                updateScoreToBeat(statics.workoutId , statics.athletes);
                updateNtp();
            }
        }).then(()=>{
            StateConnection('connected','static','')
        })
        .catch((e)=>{
            console.log(e)
            StateConnection('error','static', e)
        });
}

async function getDynamics(skDynamicUrl) {
    return fetch(skDynamicUrl, {cache: "no-store"})
        .then((response)=>{
            return response.json()
        }).then((dynamics)=>{
            console.log('dynamics')

            if(dynamics.eventId != undefined){
                const {athletes, status, NtpTimeStart, ...rest} = dynamics

                // Insert des datas dans l'objet status
                statusHeat.value = {status, NtpTimeStart}

                console.log(statusHeat.value)
                
                // Insert des nouvelles datas des athletes
                d_athletes.value = athletes

                // Dynamics.value = dynamics
            }

            // console.log(dynamics)
        }).then(()=>{
            StateConnection('connected','dynamic','')
        })
        .catch((e)=>{
            console.log(e)
            StateConnection('error','dynamic', e)
        })
}
