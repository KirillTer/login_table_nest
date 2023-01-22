import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @ApiOperation({summary: 'Featch all posts'})
    @ApiResponse({status: 200, type: [Post]})
    @Roles("USER")
    @Get()
    getAll() {
        return this.postService.getAllPosts();
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto,
               @UploadedFile() image) {
        return this.postService.create(dto, image)
    }

}