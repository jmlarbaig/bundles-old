
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
                '<div class="rank text-nowrap text-truncate"> ' + data.rank + '</div>' + 
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
                '<div class="rank">'+ data.lane + '</div>' + 
                '<div class="lane"># '+ data.lane + '</div>' + 
                '<div class="flag">' + '<div class="box_flag" ></div> ' + '</div>' +
                '<div class="name">' + name + '</div>' + 
                '<div class="score intial_rank"></div>' +
            '</div>' +
            '<div class="popup">' + '</div>' +
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
                '<div class="rank text-nowrap text-truncate"> ' + data.rank + '</div>' + 
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
    !setupLeaderboard.value.affiliate ? $item.find(".affiliate").hide() : "" ;
    // !setupLeaderboard.value.lane ? $item.find(".lane").hide() : "" ;
    // $item.hide();

    return $item
}

function commentator(data){

    let name = treatDisplayName(data.displayName);
    let flag = data.countryCode != "LOGO" ? ("https://flagcdn.com/"+ data.countryCode.toLowerCase()+'.svg') : (logoEvent.value[0].url) ;


    let $item = $( 
        '<div class="athlete" id="aht'+data.lane+'">' + 
            '<div class="popup text-nowrap text-truncate">' + '</div>' +
            '<div class="ath">' +
                '<div class="rank text-nowrap text-truncate"> ' + data.rank + '</div>' + 
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
    // $item.hide();

    return $item
}