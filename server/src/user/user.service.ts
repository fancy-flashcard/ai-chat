import { Injectable, Logger } from '@nestjs/common';
import { NLProcessor } from '../nlprocessor';
import { IMessage } from '../interfaces';
import { Persistency } from '../persistency';
import { Helper } from '../helper';

@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name)

    public async getResponse(clientId: string, input: string, languageCode: string): Promise<any> {
        const nlprocessor = NLProcessor.getInstance(clientId, languageCode)
        const response: any = await nlprocessor.process(input, languageCode)

        if (response.anser === undefined){
            const defaultResponses = Persistency.getTrainingData(clientId, "tbd").defaultResponses
            const index =Helper.getRandomArbitrary(0, defaultResponses.length-1)
            response.anser = defaultResponses[index]
        }

        Persistency.addMessage(clientId, input, response.answer)

        return response
    }
}
