require('dotenv').config() //
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.interceptor';
import * as cors from 'cors';

import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express';
import * as express from 'express';
//import * as functions from 'firebase-functions';

const server: express.Express = express();

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.enableCors({
    origin: [
      '*',
      'https://coopeere-eco.web.app', 
      'https://coopeere-eco.web.app/' , 
      'http://localhost:8100', 
      'http://localhost:8100/' , 
      'http://localhost:8101', 
      'http://localhost:8101/', 
      'https://grandfinale.onrender.com/auth/get-by-email',
      'https://grandfinale.onrender.com/auth/get-by-email/',
      'https://viacep.com.br/ws/undefined/json',  
      'https://viacep.com.br/ws/undefined/json/', 
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  return app.init();
};
 //
createNestServer(server)
  .then((v) => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      '*','https://coopeere-eco.web.app/', 'https://coopeere-eco.web.app' , 'http://localhost:8100', 'http://localhost:8100/', 'http://localhost:8101', 'http://localhost:8101/'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LogInterceptor());

  app.use(
    cors({
      origin: ['*', 'https://coopeere-eco.web.app', 'https://coopeere-eco.web.app/', 'http://localhost:8100', 'http://localhost:8100/', 'http://localhost:8101', 'http://localhost:8101/' ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  await app.listen(3001);
}
//
bootstrap();
