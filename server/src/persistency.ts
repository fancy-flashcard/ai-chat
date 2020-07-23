import * as fs from 'fs-sync'
import * as path from 'path'
import { Logger } from '@nestjs/common';
import { ITrainingData, IMessage, IRegistrationResult } from './interfaces';
import { v4 as uuidv4 } from 'uuid';

const shell = require('shelljs');

export class Persistency {

    private static readonly logger: Logger = new Logger(Persistency.name)

    private static readonly basePath = path.join(__dirname, './../../operational-data/')

    private static readonly pathToSecrets = `${Persistency.basePath}/clients-to-secrets.json`

    private static clientsToSecrets = fs.readJSON(Persistency.pathToSecrets)

    public static getAllRegisteredClients(): string[] {
        const clientIds: any[] = []
        for (const entry of Persistency.clientsToSecrets) {
            clientIds.push({
                clientId: entry.clientId,
                languageCode: entry.languageCode
            })
        }

        return clientIds
    }

    public static registerClient(clientId: string, languageCode: string, adminKey: string): IRegistrationResult {
        const newClientSecret = uuidv4();
        fs.write(`${Persistency.basePath}/${clientId}/training-data.json`, JSON.stringify([]))
        fs.write(`${Persistency.basePath}/${clientId}/messages.json`, JSON.stringify([]))

        Persistency.clientsToSecrets.push({
            clientId,
            clientSecret: newClientSecret,
            languageCode
        })
        fs.write(Persistency.pathToSecrets, JSON.stringify(Persistency.clientsToSecrets))

        return { newClientSecret }
    }

    public static getTrainingData(clientId: string, clientSecret: string): ITrainingData {
        const path = `${Persistency.basePath}/${clientId}/training-data.json`
        return fs.readJSON(path)
    }

    public static saveTrainingData(clientId: string, trainingData: ITrainingData): void {
        const path = `${Persistency.basePath}/${clientId}/training-data.json`
        fs.write(path, JSON.stringify(trainingData))
    }

    public static getMessages(clientId: string, clientSecret: string, theLastXMessages: number): any[] {
        const path = `${Persistency.basePath}/${clientId}/messages.json`
        return fs.readJSON(path)
    }

    public static addMessage(clientId: string, text: string, response: string): void {
        const path = `${Persistency.basePath}/${clientId}/messages.json`
        const all: IMessage[] = fs.readJSON(path)
        const newMessage: IMessage = {
            text,
            resp: response,
            time: Date.now().toString()
        }
        all.push(newMessage)

        fs.write(path, JSON.stringify(all))
    }
}