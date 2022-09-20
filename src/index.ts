import { assets } from './constants';
import { processData } from './dataProcessor';
import { processFile } from './fileProcessor';
import { retriveAssetsValue } from './networkService';

async function main() {

    console.log('Calling server to retrieve token prices...');

    let assetValues=await retriveAssetsValue();

    console.log('Reading your investments logs...');

    let array = await processFile('data/transactions.csv');

    console.log('Processing...');

    let  calculatedOutput=processData(array,assetValues);

    calculatedOutput.forEach((item)=>{
        console.log(`${assets[item.asset]}  -  Total asset  : ${item.total} - Total value in USD : ${item.totalValue}`);
    });
    

}

main();
