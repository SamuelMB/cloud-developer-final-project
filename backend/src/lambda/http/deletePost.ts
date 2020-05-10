import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from 'aws-lambda';
import { createLogger } from '../../utils/logger';

const logger = createLogger('deletePost');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const postId = event.pathParameters.postId;
  logger.info(`Deleting Post with id ${postId}`);
  return undefined;
};
