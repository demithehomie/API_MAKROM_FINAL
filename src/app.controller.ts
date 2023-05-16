import { Controller, Get, Options, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
//
  @Post()
  setHello(): string {
    return 'POST: Hello Hcode!';
  }

  @Options("*")
  async handleOptions() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Max-Age": 86400, // Cache CORS preflight response for 24 hours
      },
      statusCode: 200,
      body: "",
    };
  } ///

}
