import { Module } from '@nestjs/common';
import { BlogsController } from './blogs/controller/blogs.controller';
import { BlogsService } from './blogs/application/blogs.service';
import { BlogsQueryRepository } from './blogs/repositories/blogs.query-repository';
import { BlogsRepository } from './blogs/repositories/blogs.repository';
import { PostsService } from './posts/application/posts.service';
import { PostsRepository } from './posts/repositories/posts.repository';
import { PostsController } from './posts/controller/posts.controller';
import { PostsQueryRepository } from './posts/repositories/posts.query-repository';
import { CommentsController } from './comments/controller/comments.controller';
import { CommentsQueryRepository } from './comments/repositories/comments.query-repository';
import { UsersController } from './users/controller/users.controller';
import { UsersQueryRepository } from './users/repositories/users.query-repository';
import { UsersService } from './users/application/users.service';
import { UsersRepository } from './users/repositories/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blogs/domain/blogs.entity';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { Post, PostSchema } from './posts/domain/posts.entity';
import { Comment, CommentSchema } from './comments/domain/comments.entity';
import { User, UserSchema } from './users/domain/users.entity';
import { TestingController } from './testing/controller/testing.controller';
import { TestingRepository } from './testing/repositories/testing.repository';
import { CommentsService } from './comments/application/comments.service';
import { CommentsRepository } from './comments/repositories/comments.repository';
import { BasicStrategy } from './auth/strategies/basic.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'),
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    BlogsController,
    PostsController,
    CommentsController,
    UsersController,
    TestingController,
  ],
  providers: [
    BlogsService,
    BlogsQueryRepository,
    BlogsRepository,
    PostsService,
    PostsRepository,
    PostsQueryRepository,
    CommentsService,
    CommentsRepository,
    CommentsQueryRepository,
    UsersQueryRepository,
    UsersService,
    UsersRepository,
    TestingRepository,
    BasicStrategy,
  ],
})
export class AppModule {}
