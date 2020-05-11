import * as AWS from 'aws-sdk';
import { PostItem } from '../../models/PostItem';
import { CreatePostRequest } from '../../requests/CreatePostRequest';
import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '../../utils/logger';
import { PostAccess } from '../dataLayer/postAccess';
import { PostUpdate } from '../../models/PostUpdate';

const logger = createLogger('postBusiness');

export class PostBusiness {
  private readonly docClient: AWS.DynamoDB.DocumentClient;
  private readonly postAccess: PostAccess;
  private readonly bucketName: string;

  constructor() {
    this.docClient = new AWS.DynamoDB.DocumentClient();
    this.postAccess = new PostAccess(this.docClient);
    this.bucketName = process.env.IMAGES_S3_BUCKET;
  }

  async createPost(
    userId: string,
    parsedBody: CreatePostRequest,
  ): Promise<PostItem> {
    const postId = uuidv4();

    logger.info(`Creating New Post`);

    const newPost: PostItem = {
      userId,
      postId,
      ...parsedBody,
      createdAt: new Date().toISOString(),
      attachmentUrl: `https://${this.bucketName}.s3.amazonaws.com/${postId}`,
    };

    const postCreated = await this.postAccess.createPost(newPost);

    logger.info(`Post Created: ${JSON.stringify(postCreated)}`);

    return postCreated;
  }

  async deletePost(postId: string, userId: string): Promise<void> {
    await this.postAccess.deletePost(postId, userId);
  }

  async getPosts(userId: string): Promise<PostItem[]> {
    return await this.postAccess.getPosts(userId);
  }

  async updatePost(
    postId: string,
    userId: string,
    updatedPost: PostUpdate,
  ): Promise<PostUpdate> {
    return await this.postAccess.updatePost(postId, userId, updatedPost);
  }
}
