import { Injectable } from "@nestjs/common";
import { CreatePostDTO } from "./dto/create-post.dto";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}


    async updatePost(id: number, data: any) {
        return this.prisma.post.update({
            where: { id: id },
            data: data
        });
    }

    async deletePost(id: number) {
        return this.prisma.post.delete({
            where: { id: id }
        });
    }
    
    async getAllPosts() {
        return this.prisma.post.findMany();
    }

    async getPostById(id: number) {
        return this.prisma.post.findUnique({
            where: { id: id }
        });
    }


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
