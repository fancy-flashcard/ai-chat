import { Controller, Get, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { ITrainingData, IMessage, IRegistrationResult } from '../interfaces';

@Controller('client')
export class ClientController {

    public constructor(private readonly clientService: ClientService){ }

    @Get('getMessages')
    getMessages(@Query('clientId') clientId: string, @Query('clientSecret') clientSecret: string, @Query('theLastXMessages') theLastXMessages: number): IMessage[] {
      return this.clientService.getMessages(clientId, clientSecret, theLastXMessages)
    }

    @Get('getTrainingData')
    getTrainingData(@Query('clientId') clientId: string, @Query('clientSecret') clientSecret: string): ITrainingData {
      return this.clientService.getTrainingData(clientId, clientSecret);
    }

}
