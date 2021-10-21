import { Request, Response } from 'express';
import * as csvToJson from 'convert-csv-to-json';

export default class USStateCityController {
    jsonArray = csvToJson
        .fieldDelimiter(',')
        .getJsonFromCsv('src/config/uscities.csv');

    public get_state_cities = async (req: Request, res: Response) => {
        try {
            let jsonOutput: any;
            jsonOutput = JSON.stringify(this.jsonArray);
            jsonOutput = jsonOutput.replace(/\\"/g, '');
            jsonOutput = JSON.parse(jsonOutput);
            jsonOutput = jsonOutput.map(({ city, state_name }) => ({
                city,
                state_name
            }));

            let result = jsonOutput.reduce((unique, o) => {
                if(!unique.some(obj => obj.city === o.city && obj.state_name === o.state_name)) {
                  unique.push(o);
                }
                return unique;
            },[]);

            jsonOutput = result;

            let states: any = new Set();
            let finalData = {};

            jsonOutput.map((data) => {
                states.add(data.state_name.trim());
            });

            states = Array.from(states.values()).sort();
            
            for (const key of states) {
                finalData[key] = new Array();
            }

            await jsonOutput.map((data) => {
                (finalData[data.state_name.trim()]).push(data.city.trim())
            });

            for (const key of states) {
                finalData[key] = Array.from(finalData[key].values()).sort();
            }           

            await res.status(200).json({
                message: finalData
            });
        } catch (err) {
            res.status(500).json({
                message: err
            });
        }
    };
}
