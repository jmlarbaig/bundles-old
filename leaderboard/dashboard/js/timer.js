
const manualChrono = nodecg.Replicant('manualChrono')

let dataToSend = {
    'timer': "00:01:00",
    'timecap':0,
    'launchedTimer' : 'false',
    'resetTimer' : 'stop'
}

function startTimer(){

    let now = Date().split(' ')[4]
    dataToSend.timer = now
    dataToSend.timecap = $('#manualTimecap').val()
    dataToSend.launchedTimer = 'start';
    manualChrono.value = dataToSend;
}

function stopTimer(){
    
    let now = Date().split(' ')[4]
    dataToSend.timer = now
    dataToSend.timecap = $('#manualTimecap').val()
    dataToSend.launchedTimer = 'stop';
    manualChrono.value = dataToSend;
}

function resetTimer(){
    let now = Date().split(' ')[4]
    dataToSend.timer = now
    dataToSend.timecap = $('#manualTimecap').val()
    dataToSend.launchedTimer = 'reset';
    dataToSend.resetTimer = true

    manualChrono.value = dataToSend

    setTimeout(()=>{
        dataToSend.resetTimer = false;
        manualChrono.value = dataToSend
    }, 1000)
}