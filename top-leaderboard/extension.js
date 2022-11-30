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

	nodecg.log.info(`Bundle "${__filename}" is initialized.`);
};
