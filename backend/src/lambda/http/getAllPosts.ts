import 'source-map-support/register';

import { APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { PostBusiness } from '../businessLogic/postBusiness';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

const logger = createLogger('getPosts');

const postBusiness = new PostBusiness();

const getAllPosts: APIGatewayProxyHandler = async (): Promise<
  APIGatewayProxyResult
> => {
  logger.info(`Getting All Posts`);
  const posts = await postBusiness.getAllPosts();
  logger.info(`Posts Recovered: ${JSON.stringify(posts)}`);
  return {
    statusCode: 200,
    body: JSON.stringify({ items: posts }),
  };
};

export const handler = middy(getAllPosts).use(cors({ credentials: true }));
