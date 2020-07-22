import { Injectable } from '@nestjs/common';
import { NLProcessor } from '../nlprocessor';

@Injectable()
export class UserService {

    public getResponse(clientId: string, input: string, languageCode: string): any{
        const nlprocessor = NLProcessor.getInstance(clientId, languageCode)
        const response: any = nlprocessor.process(input, languageCode)
        
        return response
    }
}
