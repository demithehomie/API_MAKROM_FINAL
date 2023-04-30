import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClienteController } from './client.controller';
import { ClienteService } from './client.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule
  ],
  controllers: [ClienteController],
  providers: [
    PrismaService, ClienteService
  ],
  exports: [ClienteService]
})
export class ClienteModule {}