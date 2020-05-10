import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';

const logger = createLogger('createPost');

import { CreatePostRequest } from '../../requests/CreatePostRequest';
import { createLogger } from '../../utils/logger';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const newPost: CreatePostRequest = JSON.parse(event.body);
  logger.info(`Creting new Post: ${newPost}`);
  return undefined;
};
