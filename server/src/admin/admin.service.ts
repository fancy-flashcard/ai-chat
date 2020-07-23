import { Injectable, Logger } from '@nestjs/common';
import { Persistency } from '../persistency';
import { IRegistrationResult } from '../interfaces';
import { NLProcessor } from '../nlprocessor';

@Injectable()
export class AdminService {

    private readonly logger = new Logger(AdminService.name)
    
    public registerClient(clientId: string, languageCode: string, adminKey: string): IRegistrationResult {
        const registrationResult = Persistency.registerClient(clientId, languageCode, adminKey)
        NLProcessor.getInstance(clientId, languageCode) 

        return registrationResult
    }

}
