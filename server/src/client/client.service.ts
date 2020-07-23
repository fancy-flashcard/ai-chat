import { Injectable, Logger } from '@nestjs/common';
import { Persistency } from '../persistency';
import { ITrainingData } from '../interfaces';
import { NLProcessor } from '../nlprocessor';

@Injectable()
export class ClientService {

    private readonly logger = new Logger(ClientService.name)
    
    public getMessages(clientId: string, clientSecret: string, theLastXMessages: number){
        return Persistency.getMessages(clientId, clientSecret, theLastXMessages)
    }
    
    public getTrainingData(clientId: string, clientSecret: string) {
        return Persistency.getTrainingData(clientId, clientSecret)
    }

    public async postTrainingData(clientId: string, languageCode: string, trainingData: ITrainingData ): Promise<any> {
        await NLProcessor.getInstance(clientId, languageCode).train(trainingData)
        Persistency.saveTrainingData(clientId, trainingData)
    }

}
