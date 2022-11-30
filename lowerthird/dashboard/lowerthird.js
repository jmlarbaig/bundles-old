var Data = {
    "id":0,
    "Name":"",
    "Fonction":"",
    "url":"",
    "qrcode":"",
}

var Data_static = {
    "id":0,
    "Localisation":"",
    "Event":"",
    "url":"",
    "qrcode":"",
}

const statics = nodecg.Replicant('statics', 'connector');
// const dynamics = nodecg.Replicant('dynamics', 'connector');

const timeReplicant = nodecg.Replicant('time')
const time_startReplicant = nodecg.Replicant('time_startReplicant')    

const UrlChange = nodecg.Replicant('UrlChange');

const showLeaderboard_lead = nodecg.Replicant('showLeaderboard_Lead')
const showFlag = nodecg.Replicant('showFlag')
const showWodDetails = nodecg.Replicant('showWodDetails')

const laneInfos = nodecg.Replicant('laneInfos')
const laneShow = nodecg.Replicant('laneShow')
const ParticipantsWod = nodecg.Replicant('ParticipantsWod','connector');

const LowerThirdConfig = nodecg.Replicant('LowerThirdConfig')
const sponsorLower = nodecg.Replicant('assets:sponsorLower', 'versus')
const lowerThirdData = nodecg.Replicant('lowerThirdData')
const lowerThirdVoidShow = nodecg.Replicant('lowerThirdVoidShow')
const lowerThirdEventShow = nodecg.Replicant('lowerThirdEventShow')
const lowerThirdYTShow = nodecg.Replicant('lowerThirdYTShow')
const lowerThirdCodePromo = nodecg.Replicant('lowerThirdCodePromo')
const lowerThirdShowCode = nodecg.Replicant('lowerThirdShowCode')
const codePromo = nodecg.Replicant('assets:codePromo', 'connector')

var lowerThird = []

sponsorLower.on('change', (newValue)=> {
    resetSelectSponsor(newValue)
    // A revoir
})

codePromo.on('change', (newValue)=> {
    resetSelectQrCode(newValue)
    // A revoir
})

statics.on('change', (newValue, oldValue) => {
    console.log("static = ", newValue)
    console.log("ParticipantsWod = ", ParticipantsWod.value)

    // LogoImg.value = newValue.logoUrl
    // if(ParticipantsWod.value != undefined){
    //     currentHeat =  ParticipantsWod.value.find(element => element.id == newValue.workoutId)
    //     console.log(" currentHeat : ",currentHeat)
    //     participantsCurrentHeats = currentHeat.heats.find(element => element.id == newValue.heatId)
    //     console.log(" participantsCurrentHeats : ",participantsCurrentHeats)
        
    //     newValue.athletes.forEach(function(element){
    //         console.log(element.lane-1)
    //         element.affiliate = participantsCurrentHeats.stations.find(elt => elt.station == element.lane).affiliate
    //     })
    
    //     resetLane(newValue)
    // }
}); 


function Aff_LW(){
    console.log(event.target.id)

    id = event.target.id
    Data.id = id
    Data.Name = document.getElementById("NameLower_"+id).value;
    Data.Fonction = document.getElementById("Fonction_"+id).value;
    Data.url = document.getElementById("sponsor_"+id).value;
    Data.qrcode = document.getElementById("QrCode_"+id).value;

    console.log("Data  [] = ", Data)
    lowerThirdData.value = Data;
    lowerThird[id] = Object.assign( {}, lowerThird[id], Data);

    console.log("Lowerthird [] = ", lowerThird)

    setTimeout(function(){ 
    }, 100);

    lowerThirdVoidShow.value = true;
    setTimeout(function(){ 
        lowerThirdVoidShow.value = false; 
    }, 4000);
}

function Aff_LW_static(){
    // console.log(event.target.id)
    console.log("Text infos = ",  document.getElementById("NameLower_Static").value)
    console.log("Text infos = ",  document.getElementById("Fonction_Static").value)
    console.log("Text infos = ",  document.getElementById("sponsor_static").value)

    id = event.target.id
    Data.id = id
    Data.Name = document.getElementById("NameLower_Static").value;
    Data.Fonction = document.getElementById("Fonction_Static").value;
    Data.url = document.getElementById("sponsor_static").value;
    Data.qrcode = document.getElementById("QrCode_Static").value;

    lowerThirdData.value = Data;

    var value = document.getElementById("showEvent").checked
    console.log("Value infos = ",  value)
    switch(value){
        case true:
            lowerThirdEventShow.value = true;
            break;
        case false: 
            lowerThirdEventShow.value = false;
            break;
    }
}

function Aff_LW_YT(){
    // console.log(event.target.id)
    console.log("Text infos = ",  document.getElementById("NameLower_YT").value)
    console.log("Text infos = ",  document.getElementById("Fonction_YT").value)

    id = event.target.id
    Data.id = id
    Data.Name = document.getElementById("NameLower_YT").value;
    Data.Fonction = document.getElementById("Fonction_YT").value;

    lowerThirdData.value = Data;

    var value = document.getElementById("showYT").checked
    console.log("Value infos = ",  value)
    switch(value){
        case true:
            lowerThirdYTShow.value = true;
            break;
        case false: 
            lowerThirdYTShow.value = false;
            break;
    }
}

function AffichageCodePromo(){
    var code = {}
    code.urlQrcode = document.getElementById("Qrcode").value;
    code.urlSponsor = document.getElementById("sponsor_Qrcode").value;
    code.discount = document.getElementById("codePromo").value;
    lowerThirdCodePromo.value = code;

    console.log("code = ",code)


    var value = document.getElementById("showCodepromo").checked
    console.log("Value infos = ",  value)
    switch(value){
        case true:
            lowerThirdShowCode.value = true;
            break;
        case false: 
            lowerThirdShowCode.value = false;
            break;
    }
}


nodecg.readReplicant('LowerThirdConfig', (value)=>{
    console.log("Value = ",value)
    value.forEach((element, i) => {
        console.log("Element =", element)
        console.log("i =", i)
        if (element != undefined){
            document.getElementById("NameLower_"+(i)).value = element.Name
            document.getElementById("Fonction_"+(i)).value = element.Fonction
            document.getElementById("QrCode_"+(i)).value = element.qrcode
        }
    })
})

function save_parameters(){
    for (let i = 1; i<=6 ;i++){
        lowerThird[i] = Object.assign( {}, lowerThird[i], Data);
        lowerThird[i].Name = document.getElementById("NameLower_"+i).value;
        lowerThird[i].Fonction = document.getElementById("Fonction_"+i).value;
        lowerThird[i].url = document.getElementById("sponsor_"+i).value;
        lowerThird[i].qrcode = document.getElementById("QrCode_"+i).value;
    }
    LowerThirdConfig.value = lowerThird
}

function reset_parameters(){
    for (let i = 1; i<=6 ;i++){
        lowerThird[i] = Object.assign( {}, lowerThird[i], Data);
        document.getElementById("NameLower_"+(i)).value = ""
        document.getElementById("Fonction_"+(i)).value = ""
        document.getElementById("QrCode_"+(i)).value = ""
        lowerThird[i].Name = "";
        lowerThird[i].Fonction = "";
        lowerThird[i].url = "";
        lowerThird[i].qrcode = "";
    }
    LowerThirdConfig.value = lowerThird
}



tinymce.init({
    selector: 'textarea#default',  // change this value according to your HTML
    plugins: [
        'link',
        'lists',
        'autolink',
      ],
    init_instance_callback: function (editor) {
        editor.on('input', function (e) {
            $('#exemple').html(myContent.getContent())
        });
    }
  });

  var myContent;

    tinymce.on('AddEditor', function(e) {
        console.log('Added editor with id: ' + e.editor.id);
        myContent = tinymce.get("default");
        console.log(myContent)    
    });
