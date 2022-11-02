
    const UrlChange_internal = nodecg.Replicant('UrlChange_internal', 'leaderboard')

    var widthWindow = window.innerWidth;
    var heigthWindow = window.innerHeight;

    document.getElementById("embed").width = widthWindow
    document.getElementById("embed").heigth = heigthWindow

    UrlChange_internal.on('change', (newValue, oldValue) => {
        console.log("Url = ",newValue)
        console.log("Url Old = ",oldValue)
        if( newValue != undefined){
            changeWindow(newValue)
        }
    })

    function changeWindow(url){

        $("#embedDiv").fadeOut()
        setTimeout(()=>{
            console.log("2")
            $("#embed").attr('src', url).then(
                $("#embedDiv").fadeIn(3000)
            )
        }, 1000)
    }