import { Injectable } from '@nestjs/common';
import { Persistency } from '../persistency';
import { ITrainingData } from '../interfaces';

@Injectable()
export class ClientService {

    public getMessages(clientId: string, clientSecret: string, theLastXMessages: number){
        return Persistency.getMessages(clientId, clientSecret, theLastXMessages)
    }
    
    public getTrainingData(clientId: string, clientSecret: string) {
        return Persistency.getTrainingData(clientId, clientSecret)
    }

    public postTrainingData(clientId: string, trainingData: ITrainingData ) {
        return Persistency.saveTrainingData(clientId, trainingData)
    }

}
