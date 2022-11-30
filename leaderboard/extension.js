'use strict';

const fs = require('fs');

const setupFile = __dirname + '/setupFile.json'


module.exports = function (nodecg) {

    const router = nodecg.Router();
    router.post('/chrono', (req, res) => {
        showChrono.value = req.body.show
    });

    router.post('/wod', (req, res) => {
        showWodDetails.value = req.body.show
    });

    router.post('/leaderboard', (req, res) => {
        showLeaderboard_lead.value = req.body.show
    });

    router.post('/flag', (req, res) => {
        showFlag.value = req.body.show
    });

    router.post('/affiliate', (req, res) => {
        showAffiliate.value = req.body.show
    });

    router.post('/logo', (req, res) => {
        showLogo.value = req.body.show
    });

    nodecg.mount('/leaderboard', router);


    const setupLeaderboard = nodecg.Replicant('setupLeaderboard')
    const showChrono = nodecg.Replicant('showChrono')
    const showWodDetails = nodecg.Replicant('showWodDetails')
    const showLeaderboard_lead = nodecg.Replicant('showLeaderboard_Lead')
    const showFlag = nodecg.Replicant('showFlag')
    const showAffiliate = nodecg.Replicant('showAffiliate')
    const showLogo = nodecg.Replicant('showLogo')

    console.log(setupFile)
    if (fs.existsSync(setupFile)) {   
        try {
            setupLeaderboard.value = JSON.parse(fs.readFileSync(setupFile))
          } 
        catch (err) {
            console.error(err)
          }
	}else{
        console.log('NO')
    }

    nodecg.listenFor('setupFile', (value, ack) =>{
        console.log(value)
        let data = JSON.stringify(value);
        fs.writeFile(setupFile, data, 'utf8',function(err) {
            if (err) throw err;
            console.log('complete');
            })
            setupLeaderboard.value = value
    })

	nodecg.log.info(`Bundle "${__filename}" is initialized.`);
};
