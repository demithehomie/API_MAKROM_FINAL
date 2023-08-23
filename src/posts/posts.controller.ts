import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { CreatePostDTO } from "./dto/create-post.dto";
import { PostService } from "./posts.service";

@Controller('posts')    
export class PostController {
    constructor(private readonly postService: PostService) {}

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