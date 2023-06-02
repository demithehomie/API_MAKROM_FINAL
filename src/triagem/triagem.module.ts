import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { TriagemService } from "./triagem.service";
import { TriagemController } from "./triagem.controller";


@Module({
    imports: [
        PrismaModule,
        forwardRef(() => AuthModule)
    ],
    controllers: [TriagemController],
    providers: [TriagemService] ,
    exports: [TriagemService]
})
export class TriagemModule {}