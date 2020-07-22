import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    public constructor(private readonly userService: UserService){ }
    
    @Get('getResponse')
    getResponse(@Query('clientId') clientId: string, @Query('input') input: string, @Query('languageCode') languageCode: string): string {
      return this.userService.getResponse(clientId, input, languageCode);
    }
  
}
