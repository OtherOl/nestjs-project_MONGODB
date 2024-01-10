import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { createPostModel, updatePostModel } from '../../base/types/posts.model';
import { PostsService } from '../application/posts.service';
import { PostsQueryRepository } from '../repositories/posts.query-repository';
import { PostsRepository } from '../repositories/posts.repository';
import { createCommentModel } from '../../base/types/comments.model';
import { BasicAuthGuard } from '../../auth/guards/basic-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private postsQueryRepository: PostsQueryRepository,
    private postsRepository: PostsRepository,
  ) {}

  @Get(':postId/comments')
  @HttpCode(200)
  async getCommentsByPostId(
    @Param('postId') postId: string,
    @Query()
    query: {
      sortBy: string;
      sortDirection: string;
      pageNumber: number;
      pageSize: number;
    },
  ) {
    const comments = await this.postsQueryRepository.getCommentsByPostId(
      postId,
      query.sortBy,
      query.sortDirection,
      query.pageNumber ? +query.pageNumber : 1,
      query.pageSize ? +query.pageSize : 10,
    );
    if (!comments) throw new NotFoundException("Post doesn't exists");
    return comments;
  }

  @Post(':postId/comments')
  @HttpCode(201)
  async createCommentForPost(
    @Param('postId') postId: string,
    @Body() inputData: createCommentModel,
  ) {
    const comment = await this.postsService.createComment(postId, inputData);
    if (!comment) throw new NotFoundException("Post doesn't exists");
    return comment;
  }

  @Get()
  @HttpCode(200)
  async getAllPosts(
    @Query()
    query: {
      sortBy: string;
      sortDirection: string;
      pageNumber: number;
      pageSize: number;
    },
  ) {
    return await this.postsQueryRepository.getAllPosts(
      query.sortBy,
      query.sortDirection,
      query.pageNumber ? +query.pageNumber : 1,
      query.pageSize ? +query.pageSize : 10,
    );
  }

  @UseGuards(BasicAuthGuard)
  @Post()
  @HttpCode(201)
  async createPostForBlog(@Body() inputData: createPostModel) {
    const newPost = await this.postsService.createPost(inputData);
    if (!newPost) throw new NotFoundException("Blog doesn't exists");
    return newPost;
  }

  @Get(':id')
  @HttpCode(200)
  async getPostById(@Param('id') postId: string) {
    const post = await this.postsQueryRepository.getPostById(postId);
    if (!post) throw new NotFoundException("Post doesn't exists");
    return post;
  }

  @UseGuards(BasicAuthGuard)
  @Put(':id')
  @HttpCode(204)
  async updatePost(
    @Param('id') postId: string,
    @Body() inputData: updatePostModel,
  ) {
    const updatedPost = await this.postsRepository.updatePost(
      postId,
      inputData,
    );
    if (!updatedPost) throw new NotFoundException("Post doesn't exists");
    return;
  }

  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deletePost(@Param('id') postId: string) {
    const deletedPost = await this.postsQueryRepository.deletePostById(postId);
    if (!deletedPost) throw new NotFoundException("Post doesn't exists");
    return;
  }
}
