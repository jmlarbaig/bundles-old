
    const listCis = nodecg.Replicant('CIS', 'connector')

    const lowerThirdData = nodecg.Replicant('lowerThirdData', 'lowerthird')

    let listeCurrentHeat;

    listCis.on('change', (newValue, oldValue)=>{
        if(JSON.stringify(newValue) != JSON.stringify(oldValue)){
            listeCurrentHeat = newValue
            updateFront(newValue)
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
    