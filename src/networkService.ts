//Make node feth to work with Typescript

const importDynamic = new Function('modulePath', 'return import(modulePath)');

import { errorLogger } from "./logger";


const fetch = async (...args: any[]) => {
    const module = await importDynamic('node-fetch');
    return module.default(...args);
};

//Network call


let URL =
    'https://min-api.cryptocompare.com/data/pricemulti?api_key=29c488306b053ad2109225d638dfceec821ab018b0e8cf2a62b644164df3b882&fsyms=BTC,ETH,XRP&tsyms=USD';

async function assetsValue() {
    let response = await fetch(URL);
    return response.json();
}

function retriveAssetsValue() {
    try {
        return assetsValue();
    } catch (err) {
        errorLogger(err, 'Network Service');
        throw err;
    }
}


export { retriveAssetsValue };
