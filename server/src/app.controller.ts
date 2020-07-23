import { Controller, Get, Res, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs-sync'
import * as path from 'path'

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)
  private readonly baseHTML = fs.read(path.join(__dirname, './../../static-assets/index.html'))

  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(@Res() res: any) {
    this.logger.log('request received')
    res.send(this.baseHTML)
  }
}
