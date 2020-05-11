import 'source-map-support/register';

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from 'aws-lambda';
import { createLogger } from '../../utils/logger';
import { FileBusiness } from '../businessLogic/fileBusiness';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

const logger = createLogger('generateUploadUrl');

const fileBusiness = new FileBusiness();

const generateUploadUrlHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const postId = event.pathParameters.postId;
  logger.info(`Generating Upload Url for id ${postId}`);
  const signedUrl = fileBusiness.getSignedUrl(postId);
  logger.info(`Generated Upload Url: ${signedUrl}`);
  return {
    statusCode: 201,
    body: JSON.stringify({ uploadUrl: signedUrl }),
  };
};

export const handler = middy(generateUploadUrlHandler).use(
  cors({ credentials: true }),
);
