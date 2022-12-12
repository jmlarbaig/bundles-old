var startTimeNTP;
var timerLaunch;
var totalRep;

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
    // let now = timeNTP.value

    // console.log(timeNTP.value)
    // console.log(now)
    // console.log(timeToDateTime(timeNTP.value))

    let startTime = timeToDateTime(startTimeNTP);
    let endTime = timeToDateTime(startTimeNTP).setMinutes(startTime.getMinutes() + timecapNTP);

    // var timespan = countdown(startTime, endTime);

    let timeDiffStart = timeNTP.value - startTime;
    let timeDiffTimeCap = timeNTP.value - endTime;

    let timeDiffEnd = endTime - timeNTP.value;

    // console.log("startTime =", startTime)
    // console.log("timeDiffStart =", timeDiffStart)
    // console.log("timeDiffEnd =", timeDiffEnd)
    // console.log("timeDiffTimeCap =", timeDiffTimeCap)
    // console.log("endTime =", endTime)
    // console.log("chrono =", chrono)

    $("#chrono").css("background-color", chrono_color)
    $("#chrono").css("color", tx_chrono_color)
    // $("#chrono2").css("background-color", chrono_color)
    // $("#chrono2").css("color", tx_chrono_color)
    if (timeDiffTimeCap < 0 && (timeDiffStart+1000) > 0 && dataTime.status != 0){
        if(typeWod_G == "amrap" || Ft_Ap.value == true){
            chrono = msToTime(timeDiffEnd - 1000)
        }
        else{
            chrono = msToTime(timeDiffStart + 1000);
        }
    } else if (timeDiffTimeCap < 0 && timeDiffStart < 0){
        chrono = msToTime(timeDiffStart).substring(4);
        $("#chrono").css("background-color", "rgba(255,50,80,1)")
        $("#chrono").css("color", "white")
        // $("#chrono2").css("background-color", "rgba(255,50,80,1)")
        // $("#chrono2").css("color", "white")
    } else {
        if (timecapNTP != ''){
            chrono = timecapNTP + ":00";
        }
        else{
            chrono = "00:00"
        }
    }

    document.getElementById("chrono").innerHTML = chrono;    
    // document.getElementById("chrono2").innerHTML = chrono;

}


function resetHeat(data){

    try{
        var $list = $("#headerSection #first");
        $list.find(".heat").remove();
    
        var $item = $(
            '<div class="heat row d-xl-flex align-items-xl-center">' +

            '</div>' 
        );

        // heatDetails.$item = $item;
        $list.append($item);

    }
    catch(e){
        console.log(e)
    }
}

function showTime(){
    try{
        var $list = $(".heat");
        $list.find(".time").remove();

        var $item = $(
            '<div class="time col">' +
                '<img class="logoEvent img-fluid" id="logoEvent" src=""/>' +
                '<h3 id="chrono" class="text-center m-auto chrono"></h3>' +
                '<h3 id="timecap" class="text-center m-auto"> TIMECAP : '+ timecapNTP +"'</h3>" +
                '<div class="athlete powered" id="powered">' + 
                    '<div class="logoSK img"><img src="./img/PRESTA/SK-logo.png" alt=""></img></div>' + 
                    '<div class="text">POWERED BY</div>' + 
                    '<div class="logoFV img"><img src="./img/PRESTA/FV-logo.png" alt="" "></img></div>' + 
                '</div>' +
            '</div>' 
            // '<div class="time col">' +
            //     '<img class="logoFV img-fluid" src="./img/PRESTA/FV-logo.png"/>' +
            //     '<h3 id="chrono2" class="text-center m-auto chrono"></h3>' +
            //     '<h3 id="timecap" class="text-center m-auto"> TIMECAP : '+ timecapNTP +"'</h3>" +
            // '</div>' 
        );

        $list.append($item);
        if (timerLaunch == undefined){
            clearInterval(timerLaunch)
            timerLaunch = setInterval(updateTime, 500);
        }
        else {
            timerLaunch = setInterval(updateTime, 500);
        }

    }
    catch(e){
        console.log(e)
    }
}