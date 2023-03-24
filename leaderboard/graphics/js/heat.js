function resetHeat(data){

    try{
        var $list = $("#heat");
        $list.find(".heat_name").remove();
        $list.find(".heat_content").remove();

        let $item;

        switch(overlay){
            case 'overlay_top':
                $item = styleHeat_top(data)
            break;
            case 'overlay_side':
                $item = styleHeat_side(data)
            break;
            case 'leaderboard':
                $item = styleHeat_TV(data)
            break;
            case 'progression':
                $item = styleHeat_TV(data)
            break;
            case 'commentator':
                $item = styleHeat_TV(data)
            break;
            case 'sk':
                $item = styleHeat_TV(data)
            break;
            case 'versus':
                $item = styleHeat_Versus(data)
            break;
        }

        if(overlay.includes('overlay')){
            setupLeaderboard.value.heat != true ? $("#box_heat").hide() : "";
        }
        
        $list.append($item);

        if (mainSponsors.value.length > 0){
            $(".mainSponsor").css("background-image", "url(" + mainSponsors.value[0].url + ")");
        }
        else{
            $(".mainSponsor").hide()
        }


    }
    catch(e){
        console.log(e)
    }
}



function styleHeat_top(element){
    let $item = $(
        '<div class="heat_content">' +
            '<div class="details">' +
                '<div id="workout" class="detail" > ' + element.workoutName.toLowerCase() + ' - </div>' +
                '<div id="division" class="detail"> ' + element.heatName.toLowerCase() + ' </div>' +    
                '<div id="mvt" class="text-nowrap text-truncate"></div>' + 
            '</div>' +
            '<div class="box_mainSponsor">' +
                '<div class="presented">Presented by</div>'+
                '<div class="mainSponsor">' +
                '</div>'+
            '</div>'+
        '</div>'
    );
    return $item
}

function styleHeat_side(element){
    let $item = $(
        '<div class="heat_name">' +
            '<div class="col heatlow">' +
                '<div id="workout" class="m-auto text-nowrap text-truncate" > ' + element.workoutName + ' </div>' +
                '<div id="division" class="m-auto text-nowrap text-truncate"> ' + element.heatName + '</div>' +
            '</div>' +
            '<div class="mainSponsor col">' +
            '</div>'+
        '</div>'
    );
    return $item
}

function styleHeat_TV(element){
    let $item = $(
        '<div class="heat_content">' +
            '<div class="details">' +
                '<div id="workout" class="detail" > ' + element.workoutName + ' </div>' +
                '<div id="division" class="detail"> ' + element.heatName + ' </div>' +    
            '</div>' +
            '<div class="box_FVSK">' +
                '<div class="presented"><span>LIVE STATS AND VISUALS POWERED BY</span></br></div>'+
                '<div class="FV col">' + '</div>'+
                '<div class="SK col">' + '</div>'+
            '</div>'+
        '</div>'
    );
    return $item
}

function styleHeat_Versus(element){
    let $item = $(
        '<div class="heat_content">' +
            '<div class="details">' +
                '<div id="workout" class="detail" > ' + element.workoutName + ' </div>' +
                '<div id="division" class="detail"> ' + element.heatName + ' </div>' +    
            '</div>' +
            // '<div class="box_FVSK">' +
            //     '<div class="presented"><span>POWERED BY</span></br></div>'+
            //     '<div class="FV col">' + '</div>'+
            //     '<div class="SK col">' + '</div>'+
            // '</div>'+
        '</div>'
    );
    return $item
}