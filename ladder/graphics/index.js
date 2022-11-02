const statics = nodecg.Replicant('statics', 'connector');
const ladderAssets = nodecg.Replicant('assets:ladder')
const Att_poids = nodecg.Replicant('Att_poids', 'faceoff');

var participantEvent = {}
var participantsCurrentHeats = {}
var currentHeat = {}
var Att_poids_sub = []
var lowerThird = []
var tableWeight = [];
var score = [];

statics.on('change', (newValue, oldValue) => {
    actualiserTeam(newValue.athletes);
}); 

function actualiserTeam(athletes){
    var select = document.getElementById('Team');
    select.innerHTML = "";
    athletes.forEach((element, index) => {
        score[element.lane-1] = 0
        var opt = document.createElement('option')
        opt.value = element.lane
        opt.innerHTML = element.displayName
        select.appendChild(opt)
    })
}

ladderAssets.on('change', (newValue, oldValue) => {
    if (newValue.length > 0){
        if (newValue != oldValue){
            $.getJSON( newValue[0].url, function( data ) {
                // console.log("Data = ",data)
                var $list = $('.tableWeights');
                data.ladder.forEach((element)=>{
                    tableWeight.push(element.score)
                    var $item = $(
                        '<div class="rowWeight" id="'+element.id+'">' +
                            '<button class="col" id="'+ element.id +'" onclick="weightMinus()">-</button>'+
                            '<div class="col text-center" id="'+element.id+'">'+ element.weight +' kg</div>' +
                           ' <button class="col" id="'+ element.id +'" onclick="weightPlus()">+</button>' +
                        '</div>'
                    )
                    $list.append($item)
                })
              });
        }
    }
})

function weightMinus(){
    var id = event.target.id
    var e = document.getElementById("Team");
    var lane = e.value -1;
    if(score[lane] > 0){
        score[lane] = score[lane] - parseInt(tableWeight[id])
    }
    if(score[lane] <= 0){
        score[lane] = 0
    }
    $('#'+id).css('backgroundColor', '#FF0000');
    $('#score').css('backgroundColor', '#FF0000');
    setTimeout(()=>{
        $('#'+id).css('backgroundColor', 'white');
        $('#score').css('backgroundColor', 'white');
    },200)
    $('#score').text(score[lane])
    Att_poids.value = score;
    console.log(score)

}

function weightPlus(){
    var id = event.target.id
    var e = document.getElementById("Team");
    var lane = e.value -1;
    score[lane] = parseInt(tableWeight[id]) + score[lane]
    
    $('#'+id).css('backgroundColor', 'green');
    $('#score').css('backgroundColor', 'green');
    setTimeout(()=>{
        $('#'+id).css('backgroundColor', 'white');
        $('#score').css('backgroundColor', 'white');
    },200)
    $('#score').text(score[lane])
    Att_poids.value = score;
    console.log(score)
}


function resetScore(){
    console.log('test')
    score[document.getElementById("Team").value-1] = 0
    console.log(score)
    Att_poids.value = score;
    $('#score').text(score[lane])
}