import { Controller, Get, Query, Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  private readonly logger = new Logger(UserController.name)
  
  public constructor(private readonly userService: UserService) { }

  @Get('getResponse')
  public async getResponse(@Query('clientId') clientId: string, @Query('input') input: string, @Query('languageCode') languageCode: string): Promise<string> {
    return this.userService.getResponse(clientId, input, languageCode);
  }

}
