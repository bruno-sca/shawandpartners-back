import { NextFunction, Request, Response } from 'express';

import { getPaginationFromObject } from '@utils/pagination';

export async function nextPage(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const pagination = getPaginationFromObject(request.query);

  const fullUrl = `${request.protocol}://${request.get('host')}${
    request.baseUrl
  }`;
  const { page, pageSize } = pagination;
  const nextPage = page + 1;
  request.nextPageURL = `${fullUrl}?page=${nextPage}&pageSize=${pageSize}`;

  next();
}
