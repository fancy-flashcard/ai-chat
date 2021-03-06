import { Controller, Get, Query, Logger } from '@nestjs/common';
import { IRegistrationResult } from '../interfaces';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

  private readonly logger = new Logger(AdminController.name)
  
    public constructor(private readonly adminService: AdminService){ }
    @Get('registerClient')
    registerClient(@Query('clientId') clientId: string, @Query('languageCode') languageCode: string, @Query('adminKey') adminKey: string): IRegistrationResult {
      return this.adminService.registerClient(clientId, languageCode, adminKey);
    }

}
