import * as AWS from 'aws-sdk';
import { FileAccess } from '../dataLayer/fileAccess';

export class FileBusiness {
  private readonly s3Client: AWS.S3;
  private readonly fileAccess: FileAccess;

  constructor() {
    this.s3Client = new AWS.S3({
      signatureVersion: 'v4',
    });
    this.fileAccess = new FileAccess(this.s3Client);
  }

  getSignedUrl(postId: string): string {
    return this.fileAccess.getSignedUrl(postId);
  }
}
