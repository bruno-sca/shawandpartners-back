import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { getPaginationFromObject } from '@utils/pagination';

import { GetUserReposService } from './GetUserReposService';

class GetUserReposController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const pagination = getPaginationFromObject(request.query);

    const getUserReposService = container.resolve(GetUserReposService);

    const { repos } = await getUserReposService.execute(username, pagination);

    return response.json({ repos, nextPageURL: request.nextPageURL });
  }
}

export { GetUserReposController };
