import { Injectable } from '@nestjs/common';
import { blogModel, createBlogModel } from '../../base/types/blogs.model';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from '../domain/blogs.entity';
import { Model } from 'mongoose';

@Injectable()
export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async createBlog(blog: blogModel): Promise<blogModel> {
    return await this.blogModel.create(blog);
  }
  async updateBlog(id: string, inputData: createBlogModel) {
    return inputData;
  }
}