function updateTime(){


    let Ft_Ap = setupLeaderboard.value.fortimeAmrap;

    let timer = Date.now() + (timeNTP.value||0)

    if(newHeat){
        timer = endTime
    }

    let timeDiffStart = timer - startTime;
    let timeDiffTimeCap = timer - endTime;

    let timeDiffEnd = endTime - timer;

    $(".box_chrono").css("background-color", Clrs.chrono_color)
    $(".box_chrono").css("color", Clrs.tx_chrono_color)
    $(".chrono").css("background-color", Clrs.chrono_color)
    $(".chrono").css("color", Clrs.tx_chrono_color)

    if (timeDiffTimeCap < 0 && (timeDiffStart) > 0 ){
        $('#cap').fadeIn(1000)
        if(heat.typeWod == "amrap" || Ft_Ap ){
            chrono = msToTime(timeDiffEnd )
        }
        else {
            chrono = msToTime(timeDiffStart );
        }
    } else if (timeDiffStart < 0  && timeDiffStart > -10999 ){
        $('#cap').fadeOut(1000)
        $(".box_chrono").css("background-color", "rgba(255,50,80,1)")
        $(".box_chrono").css("color", "rgb(255,255,255")
        $(".chrono").css("background-color", "rgba(255,50,80,1)")
        $(".chrono").css("color", "rgb(255,255,255")
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
        $(".box_chrono").css("background-color", "rgba(255,50,80,1)")
        $(".box_chrono").css("color", "rgb(255,255,255")
        $(".chrono").css("background-color", "rgba(255,50,80,1)")
        $(".chrono").css("color", "rgb(255,255,255")
        if(heat.typeWod == "amrap" || Ft_Ap ){
            chrono = msToTime(timeDiffEnd)
        }
        else {
            chrono = msToTime(timeDiffStart);
        }
    }
    document.getElementById("time").innerHTML = chrono;

}

function resetTimer(){
    $(".box_chrono").css("background-color", Clrs.chrono_color)
    $(".box_chrono").css("color", Clrs.tx_chrono_color)
    $(".chrono").css("background-color", Clrs.chrono_color)
    $(".chrono").css("color", Clrs.tx_chrono_color)
    document.getElementById("time").innerHTML = "00:00";
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

        !setupLeaderboard.value.chrono && $("#box_chrono").hide();
        $list.append($item);
        $(".chrono").find('#cap').hide();

    }
    catch(e){
        console.log(e)
    }
}