import { Injectable } from "@nestjs/common";
import { CreatePostDTO } from "./dto/create-post.dto";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}

    async createPost(data: CreatePostDTO, /* userId: number */) {
        const post = await this.prisma.post.create({
            data: {
                ...data,
               // authorId: userId, // Se estiver vinculando posts a usuários
            },
        });
        return post;
    }
}
