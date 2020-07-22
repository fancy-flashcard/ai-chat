import * as fs from 'fs-sync'
import * as path from 'path'
import { Logger } from '@nestjs/common';
import { ITrainingData } from './interfaces';

const shell = require('shelljs');

export class Persistency {
    
    private static readonly logger: Logger = new Logger(Persistency.name)
    
    private static readonly basePath = path.join(path.resolve(''), '../operational-data/')
     
    public static getTrainingData(clientId: string): ITrainingData {
        const path = `${Persistency.basePath}/${clientId}/trainingData.json`
        const all = fs.readJSON(path)
        return all.filter((e: any) => e.clientId === clientId)
    }
    
    // public static registerNewClient(clientId: string): ITrainingData {
        
    // }
    
    public static saveTrainingData(clientId: string, trainingData: ITrainingData): void {
        const path = `${Persistency.basePath}/${clientId}/trainingData.json`
        fs.write(path, JSON.stringify(trainingData))
    }
}