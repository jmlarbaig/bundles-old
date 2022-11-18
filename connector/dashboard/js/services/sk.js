
async function getStatics(skStaticUrl) {
    let response = await fetch(skStaticUrl,{cache: "no-store"} );
    let currentHeatInfo = await response.json();
    return currentHeatInfo;
}

async function getDynamics(skDynamicUrl) {
    let response = await fetch(skDynamicUrl, {cache: "no-store"});
    let currentHeatInfo = await response.json();
    return currentHeatInfo;
}
