import { Injectable } from '@nestjs/common';
import { Persistency } from '../persistency';
import { IRegistrationResult } from '../interfaces';

@Injectable()
export class ClientService {

    public getMessages(clientId: string, clientSecret: string, theLastXMessages: number){
        return Persistency.getMessages(clientId, clientSecret, theLastXMessages)
    }
    
    public getTrainingData(clientId: string, clientSecret: string) {
        return Persistency.getTrainingData(clientId, clientSecret)
    }

    public registerClient(clientId: string, adminKey: string): IRegistrationResult {
        return Persistency.registerClient(clientId, adminKey)
    }
}
