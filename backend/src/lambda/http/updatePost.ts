import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';

import { UpdatePostRequest } from '../../requests/UpdatePostRequest';
import { createLogger } from '../../utils/logger';
import { PostBusiness } from '../businessLogic/postBusiness';
import { getUserId } from '../utils';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

const logger = createLogger('updatePost');

const postBusiness = new PostBusiness();

const updatePostHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const postId = event.pathParameters.postId;
  const userId = getUserId(event);
  const updatedTodo: UpdatePostRequest = JSON.parse(event.body);
  logger.info(
    `Updating Items ${JSON.stringify(updatedTodo)} for post id ${postId}`,
  );
  await postBusiness.updatePost(postId, userId, updatedTodo);
  logger.info(`Post Updated: ${JSON.stringify(updatedTodo)}`);

  return {
    statusCode: 204,
    body: '',
  };
};

export const handler = middy(updatePostHandler).use(
  cors({ credentials: true }),
);
