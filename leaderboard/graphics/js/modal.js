
function affichageStats(){

    let _lane = parseInt(event.target.id.replace('showStats_',''))
    $('#myModal').find('#card').remove()

    let $modal = $()

    if(listCis.value.length > 0 && listCis.value[_lane] != undefined){
        console.log(listCis.value[_lane])

        $modal = createModal(listCis.value[_lane])

    }else{
    
        $modal = $(
            '<div id="card" class="modal-content">' +
                '<span class="close">&times;</span>' +
                '<p>There is no athlete(s) / Team data.</p>' +
            '</div>'
        )
    }
    $('#myModal').append($modal)
    $('#myModal').slideDown(1000)

    document.getElementsByClassName('close')[0].addEventListener('click', ()=>{
        $('#myModal').slideUp(1000)
    })

}


function createModal (data){
    const { ath, workoutRank, displayName, division, lane, overallPoints, overallStanding, rank, type, countryCode} = data
    
    let $modal = $(
        '<div id="card" class="modal-content">' +
            '<span class="close">&times;</span>' +
            '<div>#'+ lane + ' ' + displayName + '</div>' +
            '<div>Division : '+ division + '</div>' +
            '<div>Overall Ranking : '+ overallStanding + '° / ' + overallPoints + 'PTS</div>' +
            '<div id="workouts" class="workouts"></div>' +
            '<div id="athletes" class="athletes"></div>' +
        '</div>'
    )
    
    Object.values(workoutRank).forEach((wod, index)=>{
        console.log(wod)
        let $wod = $(
            '<div class="wod">' + 
                '<div>' + wod.name + '</div>' + 
                '<div>' + wod.rank + '</div>' + 
                '<div>' + wod.result + '</div>' + 
            '</div>'
        )

        $modal.find('#workouts').append($wod)
    })

    Object.values(ath).forEach((athlete, index)=>{

        let age = (athlete.age || '-' )
        let avatarPath = (athlete.avatarPath || '-' )
        let crossfitAffiliateName = (athlete.crossfitAffiliateName || '-' )
        let fullName = (athlete.fullName || '-' )
        let height = (athlete.height || '-' )
        let weight = (athlete.weight || '-' )

        const {sponsors, latestEvents, benchmarks, accountId} = athlete

        let $athlete = $(
            '<div class="athlete">' + 
                '<div class="first">' +
                    '<div id="'+ accountId +'" class="avatar"></div>' + 
                    '<div class="details">' +
                        '<div>' + fullName + '</div>' + 
                        '<div>' + crossfitAffiliateName + '</div>' + 
                        '<div>' + age + ' - '+ height +'cm - '+ weight +'kg</div>' + 
                    '</div>'+
                '</div>' +
                '<div id="benchmarks_'+ accountId +'" class="benchmarks"></div>' + 
                '<div id="events_'+ accountId +'" class="events"></div>' + 
                '<div id="sponsors_'+ accountId +'" class="sponsors"></div>' + 
            '</div>'
        )

        $modal.find('#athletes').append($athlete)
        $athlete.find('#'+accountId).css('background-image','url('+ avatarPath +')')

        if( benchmarks != undefined && benchmarks.length > 0){
            Object.values(benchmarks).forEach((benchmarks, index)=>{
                let $benchmarks = $(
                    '<div class="benchmark">' +
                    '</div>'
                )
                $modal.find('#benchmarks_'+accountId).append($benchmarks)
            })
        }
        if(latestEvents != undefined && latestEvents.length > 0){
            Object.values(latestEvents).forEach((event, index)=>{
                let $event = $(
                    '<div class="events">' +
                    '</div>'
                )
                $modal.find('#events_'+accountId).append($event)
            })
        }
        if( sponsors != undefined && sponsors.length > 0){
            Object.values(sponsors).forEach((sponsor, index)=>{
                let $sponsors = $(
                        '<div class="sponsors">' +
                        '</div>'
                    )
                $modal.find('#sponsors_'+accountId).append($sponsors)
            })
        }
    })

    return $modal
}