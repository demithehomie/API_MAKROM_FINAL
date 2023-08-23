import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { CreatePostDTO } from "./dto/create-post.dto";
import { PostService } from "./posts.service";

@Controller('posts')    
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: any) {
        return this.postService.updatePost(Number(id), data);
    }
    
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.postService.deletePost(Number(id));
    }
    

    @Get()
    async getAll() {
        return this.postService.getAllPosts();
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        return this.postService.getPostById(id);
    }

    @Post()
    async create(@Body() data: CreatePostDTO, @Req() request) {
        //const userId = request.user.id; // Assumindo que você tem autenticação e o usuário está no objeto de request
        return this.postService.createPost(data, /* userId */);
    }
}

////////////