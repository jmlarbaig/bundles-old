function updateTime(){


    let Ft_Ap = setupLeaderboard.value.fortimeAmrap;

    let timer = Date.now() + (timeNTP.value||0)

    if(newHeat){
        timer = endTime
    }

    let timeDiffStart = timer - startTime;
    let timeDiffTimeCap = timer - endTime;

    let timeDiffEnd = endTime - timer;

    let chrono;

    $("#time").css("background-color", "black")
    $("#time").css("color", "white")

    if (timeDiffTimeCap < 0 && (timeDiffStart) > 0 ){
        $('#cap').fadeIn(1000)
        if(heat.typeWod == "amrap" || Ft_Ap ){
            chrono = msToTime(timeDiffEnd )
        }
        else {
            chrono = msToTime(timeDiffStart );
        }
    } else if (timeDiffStart < 0  && timeDiffStart > -5999 ){
        $('#cap').fadeOut(1000)
        $("#time").css("background-color", "rgba(255,50,80,1)")
        $("#time").css("color", "rgb(255,255,255")
        chrono = msToTime(timeDiffStart).substring(4);
    } else {
        $('#cap').fadeOut(1000)
        if (heat.timecap != ''){
            chrono = heat.timecap
        }
        else{
            chrono = "00:00"
        }
    }
    if (timeDiffTimeCap > -30000 && timeDiffTimeCap < 0 ){
        $("#time").css("background-color", "rgba(255,50,80,1)")
        $("#time").css("color", "rgb(255,255,255")
        if(heat.typeWod == "amrap" || Ft_Ap ){
            chrono = msToTime(timeDiffEnd)
        }
        else {
            chrono = msToTime(timeDiffStart);
        }
    }
    document.getElementById("time").innerHTML = chrono;

}


function showTime(Cap){
    try{
        let $list = $(".chrono");
        $list.find("#time").remove();
        $list.find("#cap").remove();

        let $item = $(
            '<div id="time"> </div>' +
            '<div id="cap">CAP '+Cap+'</div>' 
        );

        !setupLeaderboard.value.chrono && $(".chrono").hide();
        $list.append($item);
        $(".chrono").find('#cap').hide();

    }
    catch(e){
        console.log(e)
    }
}