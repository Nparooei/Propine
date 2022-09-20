import {
    assets,
    assetType,
    transactionAmount,
    transactionType,
} from './constants';
import { assetInfo, symbolPriceResponse } from './interfaces';
import { errorLogger } from './logger';

function startProcess(data: string[][],assetValues:symbolPriceResponse): assetInfo[] {

    const btcValue=assetValues.BTC.USD;
    const ethValue=assetValues.ETH.USD;
    const xrpValue=assetValues.XRP.USD;

    let BTC: assetInfo = {
        asset: assets.BTC,
        total: 0,
        totalValue: 1,
    };
    let ETH: assetInfo = {
        asset: assets.ETH,
        total: 0,
        totalValue: 1,
    };
    let XRP: assetInfo = {
        asset: assets.XRP,
        total: 0,
        totalValue: 1,
    };

    for (let transaction of data) {
        if (transaction[transactionType] === 'WITHDRAWAL') {
            if (transaction[assetType] === 'BTC')
                BTC.total -= parseFloat(transaction[transactionAmount]);
            if (transaction[assetType] === 'ETH')
                ETH.total -= parseFloat(transaction[transactionAmount]);
            if (transaction[assetType] === 'XRP')
                XRP.total -= parseFloat(transaction[transactionAmount]);
        }

        if (transaction[transactionType] === 'DEPOSIT') {
            if (transaction[assetType] === 'BTC')
                BTC.total += parseFloat(transaction[transactionAmount]);
            if (transaction[assetType] === 'ETH')
                ETH.total += parseFloat(transaction[transactionAmount]);
            if (transaction[assetType] === 'XRP')
                XRP.total += parseFloat(transaction[transactionAmount]);
        }
    }
    
    BTC.totalValue=BTC.total*btcValue;
    ETH.totalValue=ETH.total*ethValue;
    XRP.totalValue=XRP.total*xrpValue;

    return [BTC, ETH, XRP];
}

function processData(data: string[][],assetValues:symbolPriceResponse): assetInfo[] {
    try {
        return startProcess(data,assetValues);
    } catch (err) {
        errorLogger(err, 'DataProcessor');
        throw err;
    }
}

export { processData };
