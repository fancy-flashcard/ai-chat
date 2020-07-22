import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    public getResponse(clientId: string, input: string, languageCode: string){
        return 'super'
    }
}
