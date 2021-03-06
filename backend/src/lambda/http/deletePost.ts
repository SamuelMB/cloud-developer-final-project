import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { PostBusiness } from '../businessLogic/postBusiness';
import { getUserId } from '../utils';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

const logger = createLogger('deletePost');

const postBusiness = new PostBusiness();

const deletePostHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const postId = event.pathParameters.postId;
  const userId = getUserId(event);
  logger.info(`Deleting Post with id ${postId}`);
  await postBusiness.deletePost(postId, userId);
  logger.info(`Post with id ${postId} deleted`);
  return {
    statusCode: 204,
    body: '',
  };
};

export const handler = middy(deletePostHandler).use(
  cors({ credentials: true }),
);
