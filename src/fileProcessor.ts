import csv from 'csvtojson';
import { errorLogger } from './logger';

async function startProcess(filename: string): Promise<string[][]> {

        let jsonObj = await csv({ output: 'csv' }).fromFile(filename);

        if (Array.isArray(jsonObj) && Array.isArray(jsonObj[0])) {
            return jsonObj;
        } else {
            throw new Error('Input file is not a valid csv');
        }

}

async function processFile(filename:string) {
    try {
       return await startProcess(filename);
    } catch (err) {
        errorLogger(err, 'FileProcessor');
        throw err;
    }
    
}

export { processFile };
