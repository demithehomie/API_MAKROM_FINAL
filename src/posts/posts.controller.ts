import { Body, Controller, Post, Req } from "@nestjs/common";
import { CreatePostDTO } from "./dto/create-post.dto";
import { PostService } from "./posts.service";

@Controller('posts')    
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    async create(@Body() data: CreatePostDTO, @Req() request) {
        //const userId = request.user.id; // Assumindo que você tem autenticação e o usuário está no objeto de request
        return this.postService.createPost(data, /* userId */);
    }
}

////////////