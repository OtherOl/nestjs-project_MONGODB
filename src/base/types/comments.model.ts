import { ObjectId } from 'mongodb';
import { IsString, Length } from 'class-validator';

export class createCommentModel {
  @IsString()
  @Length(20, 300)
  content: string;
}

export class commentsModel {
  postId: ObjectId;
  id: ObjectId;
  content: string;
  commentatorInfo: {
    userId: string;
    userLogin: string;
  };
  createdAt: string;
  likesInfo: {
    likesCount: number;
    dislikesCount: number;
    myStatus: string;
  };
}
