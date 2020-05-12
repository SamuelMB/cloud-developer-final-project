import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { PostItem } from '../../models/PostItem';
import { PostUpdate } from '../../models/PostUpdate';

export class PostAccess {
  private readonly docClient: DocumentClient;
  private readonly postsTable: string;
  private readonly indexName: string;

  constructor(docClient: DocumentClient) {
    this.docClient = docClient;
    this.postsTable = process.env.POSTS_TABLE;
    this.indexName = process.env.INDEX_NAME;
  }

  async createPost(newPost: PostItem): Promise<PostItem> {
    await this.docClient
      .put({ TableName: this.postsTable, Item: newPost })
      .promise();

    return newPost;
  }

  async deletePost(postId: string, userId: string): Promise<void> {
    await this.docClient
      .delete({
        TableName: this.postsTable,
        Key: { postId, userId },
      })
      .promise();
  }

  async getPostsByUser(userId: string): Promise<PostItem[]> {
    const result = await this.docClient
      .scan({
        TableName: this.postsTable,
        IndexName: this.indexName,
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      })
      .promise();

    return result.Items as PostItem[];
  }

  async getAllPosts(): Promise<PostItem[]> {
    const result = await this.docClient
      .scan({ TableName: this.postsTable })
      .promise();

    return result.Items as PostItem[];
  }

  async getPostById(postId: string): Promise<PostItem> {
    const result = await this.docClient
      .scan({
        TableName: this.postsTable,
        IndexName: this.indexName,
        FilterExpression: 'postId = :postId',
        ExpressionAttributeValues: {
          ':postId': postId,
        },
      })
      .promise();

    return result.Items[0] as PostItem;
  }

  async updatePost(
    postId: string,
    userId: string,
    updatedPost: PostUpdate,
  ): Promise<PostUpdate> {
    await this.docClient
      .update({
        TableName: this.postsTable,
        Key: {
          postId,
          userId,
        },
        UpdateExpression: 'set title = :title, content = :content',
        ExpressionAttributeValues: {
          ':title': updatedPost.title,
          ':content': updatedPost.content,
        },
        ReturnValues: 'UPDATED_NEW',
      })
      .promise();

    return updatedPost;
  }
}
