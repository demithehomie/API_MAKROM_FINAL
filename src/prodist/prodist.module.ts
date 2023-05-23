import { Module, forwardRef } from "@nestjs/common";
import { FileService } from "src/file/file.service";
import { UserController } from "src/user/user.controller";
import { ProdistController } from "./prodist.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";
import { ProdistService } from "./prodist.service";
import { UserService } from "src/user/user.service";
import { PDFService } from "src/pdf/pdf.service";

@Module({
    imports: [
        PrismaModule,
        forwardRef(() => AuthModule)
    ],
    controllers: [ProdistController],
    providers: [FileService, ProdistService, UserService, PDFService],
    exports: [FileService, ProdistService, UserService]
})
export class ProdistModule {}