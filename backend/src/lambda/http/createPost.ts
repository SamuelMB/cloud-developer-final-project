import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';

import { CreatePostRequest } from '../../requests/CreatePostRequest';
import { createLogger } from '../../utils/logger';
import { PostBusiness } from '../businessLogic/postBusiness';
import { getUserId } from '../utils';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

const logger = createLogger('createPost');

const postBusiness = new PostBusiness();

const createPostHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event);
  const newPost: CreatePostRequest = JSON.parse(event.body);
  logger.info(`Creating new Post: ${JSON.stringify(newPost)}`);
  const postCreated = await postBusiness.createPost(userId, newPost);
  logger.info(`Post Created: ${JSON.stringify(postCreated)}`);
  return {
    statusCode: 201,
    body: JSON.stringify({ item: postCreated }),
  };
};

export const handler = middy(createPostHandler).use(
  cors({ credentials: true }),
);
