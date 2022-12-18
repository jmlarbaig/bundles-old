
// Header Side

function headerSide(divisions, indexDivision, repTarget){
    //! Ajouter la séparation ici
    const reps = treatReptarget(repTarget[indexDivision])
    // var reps = 0;

    var $headerSide = $(
        '<div id="leaderboard'+ indexDivision +'" class="leaderboard">' +
            '<div class="header">'+
                '<div class="text-nowrap text-truncate text-left division">' + divisions[indexDivision] + '</div>' +
                '<div class="repTar text-nowrap text-truncate repTarget'+[indexDivision]+'">' + reps + '</div>' +
            '</div>'+
            '<div id="athletes" class="athletes">' +
            '</div>' + 
        '</div>'
    );
    return $headerSide
}


function overlaySide(data){

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/"+ data.countryCode.toLowerCase()+'.svg') : (logoEvent.value[0].url) ;


    let $item = $( 
        '<div class="athlete" id="aht'+data.lane+'">' + 
            '<div class="popup text-nowrap text-truncate">' + '</div>' +
            '<div class="ath">' +
                '<div class="rank text-nowrap text-truncate"> ' + '</div>' + 
                '<div class="lane text-nowrap text-truncate"># '+ data.lane + '</div>' + 
                '<div class="flag">' + '<div class="box_flag" ></div> ' + '</div>' +
                '<div class="text-nowrap text-truncate text-left name">' + name + '</div>' + 
                '<div class="score text-nowrap text-center text-truncate"></div>' +
                '<div class="text-nowrap text-truncate rounds">' + '</div>' +
            '</div>' +
        '</div>'
    );

    $item.find(".box_flag").css('background-image','url('+ flag +')')
    $item.find(".rounds").hide();
    $item.find(".score").hide();
    $item.find(".popup").hide();
    !setupLeaderboard.value.flag ? $item.find(".flag").hide() : "" ;
    !setupLeaderboard.value.lane ? $item.find(".lane").hide() : "" ;
    !setupLeaderboard.value.lane ? $item.find(".rank").text(data.lane) : "" ;
    // $item.hide();

    return $item
}


// Header Top


function headerTop(indexDivision){
    var $headerTop = $(
        '<div id="leaderboard'+ indexDivision +'" class="leaderboard">' +
            '<div id="athletes" class="athletes">' +
            '</div>' + 
        '</div>'
    );

    return $headerTop
}

function overlayTop(data){

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/"+ data.countryCode.toLowerCase()+'.svg') : (logoEvent.value[0].url) ;


    var $item = $( 
        '<div class="athlete" id="aht'+ data.lane+'">' + 
            '<div class="ath">' +
                '<div class="rank initial_rank_top">'+ data.lane + '</div>' + 
                '<div class="name initial_rank_top">' + name + '</div>' + 
                '<div class="score initial_rank_top"></div>' +
            '</div>' +
            '<div class="popup initial_rank_top">' + '</div>' +
        '</div>'
    );
    $item.find(".box_flag").css('background-image','url('+ flag +')')
    $item.find(".popup").hide();
    !setupLeaderboard.value.flag && $item.find(".flag").hide()
    !setupLeaderboard.value.lane && $item.find(".lane").hide()
    // $item.hide();

    return $item
}

//  Leaderboard TV

function headerTV(divisions, indexDivision, repTarget){
    //! Ajouter la séparation ici
    const reps = treatReptarget(repTarget[indexDivision])
    // var reps = 0;

    var $headerTop = $(
        '<div id="leaderboard'+ indexDivision +'" class="leaderboard">' +
            '<div class="header">'+
                '<div class="text-nowrap text-truncate text-left division">' + divisions[indexDivision] + '</div>' +
                '<div id="mvt" class="text-nowrap text-truncate text-left"></div>' +
                '<div class="repTar text-nowrap text-truncate repTarget'+[indexDivision]+'">' + reps + '</div>' +
            '</div>'+
            '<div id="athletes" class="athletes">' +
            '</div>' + 
        '</div>'
    );
    return $headerTop
}


function leaderboardTV(data){

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/"+ data.countryCode.toLowerCase()+'.svg') : (logoEvent.value[0].url) ;

    let $item = $( 
        '<div class="athlete" id="aht'+data.lane+'">' + 
            // '<div class="popup text-nowrap text-truncate">' + '</div>' +
            '<div class="ath">' +
                '<div class="rank text-nowrap text-truncate"> ' + '</div>' + 
                '<div class="lane text-nowrap text-truncate"># '+ data.lane + '</div>' + 
                '<div class="flag">' + '<div class="box_flag" ></div> ' + '</div>' +
                '<div class="text-nowrap text-truncate text-left name">' + name + '</div>' + 
                '<div class="text-nowrap text-truncate text-left affiliate">' + data.affiliate + '</div>' + 
                '<div class="score text-nowrap text-center text-truncate"></div>' +
                '<div class="popup text-nowrap text-center text-truncate">HHH</div>' +
                '<div class="text-nowrap text-truncate rounds">' + '</div>' +
            '</div>' +
        '</div>'
    );

    $item.find(".box_flag").css('background-image','url('+ flag +')')
    $item.find(".rounds").hide();
    $item.find(".score").hide();
    $item.find(".popup").hide();
    !setupLeaderboard.value.flag ? $item.find(".flag").hide() : "" ;
    !setupLeaderboard.value.lane ? $item.find(".lane").hide() : "" ;
    !setupLeaderboard.value.lane ? $item.find(".rank").text(data.lane) : "" ;
    !setupLeaderboard.value.affiliate ? $item.find(".affiliate").hide() : "" ;
    // $item.hide();

    return $item
}




function progressView(data){

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/"+ data.countryCode.toLowerCase()+'.svg') : (logoEvent.value[0].url) ;


    let $item = $( 
        '<div class="athlete" id="aht'+data.lane+'">' + 
            // '<div class="popup text-nowrap text-truncate">' + '</div>' +
            '<div class="ath">' +
                '<div class="lane text-nowrap text-truncate"># '+ data.lane + '</div>' + 
                '<div class="flag">' + '<div class="box_flag" ></div> ' + '</div>' +
                '<div class="text-nowrap text-truncate text-left name">' + name + '</div>' + 
                '<div class="text-nowrap text-truncate text-left affiliate">' + data.affiliate + '</div>' + 
                '<div class="rank text-nowrap text-truncate"> ' + data.rank + '</div>' + 
                '<div class="circle_progress">' +
                    '<svg>' +
                        '<circle cx="0" cy="50%" r="20px" fill="#aeaeae" class="circle" id="circle' + data.lane+'"/>' +
                    '</svg>' +
                '</div>' +
                '<div class="score text-nowrap text-center text-truncate"></div>' +
                '<div class="popup text-nowrap text-center text-truncate">HHH</div>' +
                '<div class="text-nowrap text-truncate rounds">' + '</div>' +
            '</div>' +
        '</div>'
    );

    $item.find(".box_flag").css('background-image','url('+ flag +')')
    $item.find(".rounds").hide();
    $item.find(".score").hide();
    $item.find(".popup").hide();
    !setupLeaderboard.value.flag ? $item.find(".flag").hide() : "" ;
    !setupLeaderboard.value.lane ? $item.find(".lane").hide() : "" ;
    !setupLeaderboard.value.lane ? $item.find(".rank").text(data.lane) : "" ;
    !setupLeaderboard.value.affiliate ? $item.find(".affiliate").hide() : "" ;
    // !setupLeaderboard.value.lane ? $item.find(".lane").hide() : "" ;
    // $item.hide();

    return $item
}

function headerCommentator(divisions, indexDivision, repTarget){
    //! Ajouter la séparation ici
    const reps = treatReptarget(repTarget[indexDivision])
    // var reps = 0;

    var $headerTop = $(
        '<div id="leaderboard'+ indexDivision +'" class="leaderboard">' +
            '<div class="header">'+
                '<div class="text-nowrap text-truncate text-left division">' + divisions[indexDivision] + '</div>' +
                '<div id="mvt" class="text-nowrap text-truncate text-left"></div>' +
                '<div class="repTar text-nowrap text-truncate repTarget'+[indexDivision]+'">' + reps + '</div>' +
            '</div>'+
            '<table>' +
                '<thead>'+
                    '<tr>'+
                        '<th fixed-side scope="col" class="lane box">LANE</th>' + 
                        '<th scope="col" class="flag box">FLAG</th>' +
                        '<th scope="col" class="box text-nowrap text-truncate text-left name">NAME</th>' + 
                        '<th scope="col" class="box Orank">O. Points</th>' + 
                        '<th scope="col" class="box Orank">O. Rank</th>' +
                        '<th scope="col" class="box rank">Rank</th>' + 
                        '<th scope="col" class="box stats statsHeader" id="statsHeader_'+indexDivision+'">' + '</th>'+
                        '<th scope="col" class="box rounds text-nowrap text-truncate">Rounds</th>' + 
                        '<th scope="col" class="box score align-items-xl-center">Scores</th>' +
                        '<th scope="col" class="box popup text-nowrap text-truncate">Mouvement</th>' + 
                    '</tr>' +
                '</thead>'+
                '<tbody id="athletes" class="athletes">' +
                '</tbody>' + 
            '</table>' +
        '</div>'

    );

    $headerTop.find('.rounds').hide()
    return $headerTop
}

function createStatsHeader(iDiv){

    var $stat_header = $('#statsHeader_'+iDiv);
    $stat_header.find("tr").remove();

    $stat_header.append('<tr id="'+ iDiv +'"></tr>')

    if(workouts.length >0){
        workouts[iDiv].mvt_id.forEach((id, index)=> {
            
            var $item_header = $(
                '<td class="stats_name text-nowrap text-truncate">'+ (workouts[iDiv].mvt_reps[index] != 0 ? workouts[iDiv].mvt_reps[index] : '') + ' ' +workouts[iDiv].mvt_names[index]+' </td>'
                // '<div class="mvt_id'+id+' "></div>'
            )
            $stat_header.find('#'+iDiv).append($item_header);
        })
    }
    else{
        var $item_header = $(
            '<div class="stats_name text-nowrap text-truncate"></div>'
        )
        $stat_header.append($item_header);
    }
}

function commentator(data){

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/"+ data.countryCode.toLowerCase()+'.svg') : (logoEvent.value[0].url) ;
    var affiliate_team =  data.affiliate != undefined ?  data.affiliate : '-'

    let $item = $( 
        '<tr class="athlete" id="aht'+data.lane+'">' + 
            '<td class="lane">'+ data.lane + '</td>' + 
            '<td class="flag">' + '<div class="box_flag"> </div> ' + '</td>' +
            '<td class="text-nowrap text-truncate text-left name" onclick="affichageStats()" id="showStats_'+ data.lane +'">' + name + '</td>' + 
            '<td class="Orank">' + data.overallPoints + '</td>' + 
            '<td class="Orank">' + data.rank + '</td>' +
            '<td class="rank">' + data.CurrentRank  + '</td>' + 
            '<td class="stats" id="athlete_stats_'+ data.lane+'">' + '</td>'+
            // '<td class="circle_progress">' +
            //     '<svg>' +
            //         '<circle cx="10" cy="50%" r="5px" fill="#aeaeae" class="circle" id="' + athletes_tdison[key][i].lane+'"/>' +
            //     '</svg>' +
            // '</td>' +
            '<td class="rounds text-nowrap text-truncate"></td>' + 
            '<td class="score align-items-xl-center">' + data.score_abs + '</td>' +
            '<td class="popup text-nowrap text-truncate"></td>' + 
        '</tr>'
    );

    $item.find(".box_flag").css('background-image','url('+ flag +')')
    $item.find(".rounds").hide();
    // $item.hide();

    return $item
}

function createStats( data, iDiv){

    let $stats = $('#athlete_stats_'+data.lane);
    $stats.find("td").remove();

    let $stat;

    if( workouts.length > 0){
        workouts[iDiv].mvt_id.forEach((id, index)=> {
            $stat = $('');
            $stat = $(
                '<td class="mvt_id mvt_id_'+ index +'" id="mvt_id_'+ id +'_'+ data.lane +'">-</td>'
            )
            $stats.append($stat)
        })
    }else{
        $stat = $('');
        $stats.append($stat)
    }

}