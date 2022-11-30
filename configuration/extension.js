'use strict';

const colorFile = require('./colorDefaut.json');

const fs = require('fs');
const path = require('path');

module.exports = function (nodecg) {
    const Colors = nodecg.Replicant('Colors')
    const currentPath = process.cwd() + "/bundles/configuration/";
	const pkgPath = path.join(currentPath,"colorDefaut.json");


    if (fs.existsSync(pkgPath)) {   
        try {
            Colors.value = JSON.parse(fs.readFileSync(pkgPath))
          } 
        catch (err) {
            console.error(err)
          }
	}

    nodecg.listenFor('colorOverwrite', (value, ack) =>{
        let data = JSON.stringify(value);
        fs.writeFile(pkgPath, data, 'utf8',function(err) {
            if (err) throw err;
            console.log('complete');
            })
            Colors.value = value
    })


	nodecg.log.info(`Bundle "${__filename}" is initialized.`);
};
