import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { getUserId } from '../utils';

const logger = createLogger('getPosts');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event);
  logger.info(`Getting Posts for User ${userId}`);
  // TODO: Get all TODO items for a current user
  return {
    statusCode: 200,
    body: '',
  };
};
