var startTimeNTP;
var timerLaunch;


function updateTime(){

    Ft_Ap = setupLeaderboard.value.fortimeAmrap;

    timer = Date.now() + (timeNTP.value||0)
    let timeDiffStart = timer - startTime;
    let timeDiffTimeCap = timer - endTime;

    let timeDiffEnd = endTime - timer;

    $("#time").css("background-color", "black")
    $("#time").css("color", "white")

    // console.log('startTime ', startTime)
    // console.log('endTime ', endTime)
    // console.log('timeDiffStart ', msToTime( timeDiffStart))
    // console.log('timeDiffTimeCap ',  msToTime( timeDiffTimeCap))
    // console.log('timeDiffEnd ',  msToTime( timeDiffEnd))

    if (timeDiffTimeCap < 0 && (timeDiffStart+1000) > 0 ){
        $('#cap').fadeIn(1000)
        if(heat.typeWod == "amrap" || Ft_Ap == true){
            chrono = msToTime(timeDiffEnd - 1000)
        }
        else {
            chrono = msToTime(timeDiffStart + 1000);
        }
    } else if (timeDiffStart < 0  && timeDiffStart > -5000 ){
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
        if(heat.typeWod == "amrap" || Ft_Ap == true){
            chrono = msToTime(timeDiffEnd - 1000)
        }
        else {
            chrono = msToTime(timeDiffStart + 1000);
        }
    }
    document.getElementById("time").innerHTML = chrono;

}


function showTime(Cap){
    try{
        var $list = $(".chrono");
        $list.find("#time").remove();
        $list.find("#cap").remove();

        var $item = $(
            '<div id="time"> </div>' +
            '<div id="cap">CAP '+Cap+'</div>' 
        );

        setupLeaderboard.value.chrono != true ? $(".chrono").hide() : "";
        $list.append($item);
        $(".chrono").find('#cap').hide();

    }
    catch(e){
        console.log(e)
    }
}