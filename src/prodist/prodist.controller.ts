import { Controller, Request, Post, Body, UseGuards, UseInterceptors, BadRequestException, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, UnauthorizedException } from "@nestjs/common";
import { ProdistService } from "./prodist.service";
import { ProdistDTO } from "./dto/create-prodist.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import {  Param, UploadedFile, UploadedFiles } from "@nestjs/common/decorators";
//import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/guards/auth.guard";
import {join} from 'path';
import { User } from "src/decorators/user.decorator";
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from "@nestjs/platform-express";
import { FileService } from "src/file/file.service";

@Roles(Role.User)
//@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('prodist')
export class ProdistController {

    constructor(
        private readonly prodistService: ProdistService,
        private readonly fileService: FileService,
        ){}

    @Post('criar')
    async create(@Body() data: ProdistDTO) {
        return this.prodistService.create(data);
    } 



    @UseInterceptors(FileInterceptor('file'))
   @UseGuards(AuthGuard)
    @Post('conta-de-luz')
    async uploadProdist(
        @User() user,
        @UploadedFile() file: Express.Multer.File
    ) {
//
if (!file) {
    throw new BadRequestException('No file uploaded');
  }

  if (file.mimetype !== 'application/pdf') {
    throw new BadRequestException('Invalid file type. Only PDF files are allowed');
  }

  const fileName = `formprodist-${user.id}.pdf`;
  const path = join(__dirname, '..', '..', 'storage', 'prodist', fileName);

        
  try {
    await this.fileService.upload(file, path);
  } catch (e) {
    throw new BadRequestException(e);
  }

  return { fileName }

} 

// @UseInterceptors(FileInterceptor('file'))
// @Post('conta-de-luz')
// async uploadContaDeLuz(@User() user,
//         @UploadedFile() file: Express.Multer.File){

//             return {user, file}
// }

}