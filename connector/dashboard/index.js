const dataNewConfigCC = {"usernameCC":"","passwordCC":"", "eventId":0}

let staticJSONString = "";
let dynamicJSONString = "";
let heatId = "";
let athletes_final = new Array();
let sameJson;
let adr_IP_static;
let adr_IP_dynamics;
let EventPlanner = [];
let heatWUP = []
let static_
let workoutId;
let wodId;

let statics_timer;
let dynamics_timer;

let init = false

let data = []


    logoEvent.on('change', (newValue) => {
        // console.log(newValue[0].url)
        if(newValue.length>0){
            $("#logo_event").css("background-image", "url(" + newValue[0].url + ")");
        }
    })



    async function Connection (){
        try{
            await ConnectionCC()
            await ConnectionSK()
        }
        catch(e){
            Deconnection();
        }
    }

    function Deconnection(){
        try{
            document.getElementById('connection_but').disabled = false;
            nodecg.sendMessageToBundle('connection', 'leaderboard', false);
            clearInterval(statics_timer)
            clearInterval(dynamics_timer)
            Connected.value = false;
            staticJSONString = "";
            dynamicJSONString = "";

            $('#skState').text("DECONNECTION")
            $('#led_SK').removeClass('led-green led-orange')
            $('#led_SK').addClass('led-red')

            $('#ccState').text("DECONNECTION")
            $('#led_CC').removeClass('led-green led-orange')
            $('#led_CC').addClass('led-red')

        }
        catch(e){
            console.log(e)
        }
    }

    // $( document ).ready(function() {
    //     nodecg.readReplicant('Connected', (value)=>{
    //         switch(value){
    //             case true:
    //                 Connection()
    //                 break;
    //             case false:
    //                 Deconnection();
    //                 break;
    //         }
    //     })
    // });

    Connected.on('change',(newValue, oldValue)=>{
        if(newValue){
            $('#skState').text("CONNECTED")
            $('#led_SK').removeClass('led-orange led-red')
            $('#led_SK').addClass('led-green')
            
            $('#ccState').text("CONNECTED")
            $('#led_CC').removeClass('led-orange led-red')
            $('#led_CC').addClass('led-green')
        }else{
            $('#skState').text("DECONNECTION")
            $('#led_SK').removeClass('led-green led-orange')
            $('#led_SK').addClass('led-red')

            $('#ccState').text("DECONNECTION")
            $('#led_CC').removeClass('led-green led-orange')
            $('#led_CC').addClass('led-red')
        }
    })

    nodecg.readReplicant('dataConfig', (value) =>{
        document.getElementById('address_IP').value = value.staticServer.toString()
    })

    nodecg.readReplicant('dataConfigCC', (value) =>{
        document.getElementById('usernameCC').value = value.usernameCC.toString()
        document.getElementById('passwordCC').value = value.passwordCC.toString()
        document.getElementById('eventId').value = value.eventId.toString()
    })

