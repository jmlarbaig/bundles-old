var startTimeNTP;
var timerLaunch;
var typeWod_G = undefined

function timeToDateTime(time) {
    var times = time.split(':');
    if (times.length == 3){
        var hours = times[0];
        var minutes = times[1];
        var secmili = times[2].split('.');
        var seconds = secmili[0];
        var mili = secmili[1];

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();

        // Pas de milliseconds dans le constructeur Date
        return new Date(year, month, day, hours, minutes, seconds);
    }
}

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (secs<10) { secs = '0' + secs}
    if (mins<10) { mins = '0' + mins}
    return mins + ':' + secs ;
}


function updateTime(){

    startTimeNTP = dataTime.NtpTimeStart;

    // let now = new Date();
    let startTime = timeToDateTime(startTimeNTP);
    let endTime = timeToDateTime(startTimeNTP).setMinutes(startTime.getMinutes() + parseInt(tc[1]));

    // var timespan = countdown(startTime, endTime);

    // console.log("Time = ",timeNTP.value)
    // console.log("nowNtp = ", nowNtp.value)

    let timeDiffStart = timeNTP.value - startTime;
    let timeDiffTimeCap = timeNTP.value - endTime;

    let timeDiffEnd = endTime - timeNTP.value;

    // console.log("startTime =", startTime)
    // console.log("timeDiffStart =", timeDiffStart)
    // console.log("timeDiffEnd =", timeDiffEnd)
    // console.log("timeDiffTimeCap =", timeDiffTimeCap)
    // console.log("endTime =", endTime)
    // console.log("chrono =", chrono)

    $(".time").css("background-color", chrono_color)
    $(".time").css("color", "rgb(255,255,255)")
    if (timeDiffTimeCap < 0 && timeDiffStart > 0 && dataTime.status != 0){
        if (typeWod_G == "amrap" || Ft_Ap.value == true){
            chrono = msToTime(timeDiffEnd);
        }
        else{
            chrono = msToTime(timeDiffStart);
        }
    } else if (timeDiffTimeCap < 0 && timeDiffStart < 0){
        chrono = msToTime(timeDiffStart).substring(4);
        $(".time").css("background-color", "rgba(255,50,80,1)")
        $(".time").css("color", "rgb(255,255,255)")
    } else {
        if (timecapNTP != ''){
            chrono = timecapNTP;
        }
        else{
            chrono = "00:00"
        }
    }
    document.getElementById("chronoText").innerHTML = chrono;

}

function showTime(){
    try{

        if (timerLaunch == undefined){
            clearInterval(timerLaunch)
            timerLaunch = setInterval(updateTime, 500);
        }
        else {
            timerLaunch = setInterval(updateTime, 100);
        }

    }
    catch(e){
        console.log(e)
    }
}


function resetWod(data){
    try{

        var $list = $(".chrono");
        $list.find(".time").remove();
        $list.find(".mainSponsor").remove();

        var $itemChrono = $(
            '<div class="time">' +
                '<div id="eventName" class="eventName text-center m-auto ">'+ data.workoutName +'</div>' +
                '<div id="chronoText" class="text-nowrap text-truncate chronoText text-center"> TIME</div>' +
                '<div id="timecap" class="timecap text-center m-auto ">'+ timecapNTP +"' CAP</div>" +
            '</div>'+ 
            '<div class="mainSponsor"></div>' 
        );

        $list.append($itemChrono);
        if (mainSponsors.value.length>0){
            $(".mainSponsor").css("background-image", "url(" + mainSponsors.value[0].url + ")");
            $(".mainSponsor").fadeIn(1000)
        }
    }
    catch(e){
        console.log(e)
    }
}