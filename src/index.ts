require('dotenv').config() 
const dotenv=require('dotenv');

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';

const server = express();

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  const corsOptions = {
    methods: 'GET',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
    origin: ['http://localhost:8100/', 'http://localhost:8100'],
  };

  app.enableCors(corsOptions);

  return app.init();
};

createNestServer(server)
  .then((v) => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

export const api = functions.https.onRequest(server);