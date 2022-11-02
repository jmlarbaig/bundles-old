
    const UrlChange = nodecg.Replicant('UrlChange', 'leaderboard')

    var widthWindow = window.innerWidth;
    var heigthWindow = window.innerHeight;

    document.getElementById("embed").width = widthWindow
    document.getElementById("embed").heigth = heigthWindow

    UrlChange.on('change', (newValue, oldValue) => {
        console.log("Url = ",newValue)
        console.log("Url Old = ",oldValue)
        if( newValue != undefined){
                $("embed").attr('src', newValue)
        }
    })