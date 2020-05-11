import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../utils';
import { PostBusiness } from '../businessLogic/postBusiness';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

const logger = createLogger('getPosts');

const postBusiness = new PostBusiness();

const getPostsByUserHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event);
  logger.info(`Getting Posts for User ${userId}`);
  const posts = await postBusiness.getPosts(userId);
  logger.info(`Posts Recovered: ${JSON.stringify(posts)}`);
  return {
    statusCode: 200,
    body: JSON.stringify({ items: posts }),
  };
};

export const handler = middy(getPostsByUserHandler).use(
  cors({ credentials: true }),
);
