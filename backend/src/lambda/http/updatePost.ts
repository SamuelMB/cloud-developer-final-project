import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';

import { UpdatePostRequest } from '../../requests/UpdatePostRequest';
import { createLogger } from '../../utils/logger';

const logger = createLogger('updatePost');

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const postId = event.pathParameters.postId;
  const updatedTodo: UpdatePostRequest = JSON.parse(event.body);
  logger.info(
    `Updating Items ${JSON.stringify(updatedTodo)} for post id ${postId}`,
  );

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  return undefined;
};
