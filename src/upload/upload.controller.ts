// upload.controller.ts

import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { createReadStream } from 'fs';
//import { MulterDiskUploadedFile } from '@nestjs/platform-express';
import { Client } from 'pg';
import databaseConfig from '../database.config';
import multerConfig from '../multer/multer.config';

@Controller('upload')
export class UploadController {
  private readonly pool: Client;

  constructor() {
    this.pool = new Client(databaseConfig);
    this.pool.connect();
  }
//
  // @Post()
  // @UseInterceptors(multerConfig.single('file'))
  // async handleUpload(@UploadedFile() file: MulterDiskUploadedFile) {
  //   const stream = createReadStream(file.path);
  //   const query = 'INSERT INTO arquivos (nome, conteudo) VALUES ($1, $2)';
  //   await this.pool.query(query, [file.originalname, stream]);

  //   return { message: 'Upload concluído com sucesso!' };
  // }
}
