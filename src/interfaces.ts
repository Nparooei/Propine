import { assets } from './constants';

interface assetInfo {
    asset: assets;
    total: number;
    totalValue: number;
}

interface symbolPriceResponse {
    BTC: { USD:number};
    ETH: { USD: number };
    XRP: { USD: number };
}

export { assetInfo,symbolPriceResponse };
