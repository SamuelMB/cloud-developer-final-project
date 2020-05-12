import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { PostBusiness } from '../businessLogic/postBusiness';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

const logger = createLogger('getPosts');

const postBusiness = new PostBusiness();

const getPostByIdHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const postId = event.pathParameters.postId;
  logger.info(`Getting Post for id ${postId}`);
  const post = await postBusiness.getPostById(postId);
  logger.info(`Post Recovered: ${JSON.stringify(post)}`);
  return {
    statusCode: 200,
    body: JSON.stringify({ item: post }),
  };
};

export const handler = middy(getPostByIdHandler).use(
  cors({ credentials: true }),
);
