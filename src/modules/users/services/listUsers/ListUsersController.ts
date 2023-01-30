import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { getPaginationFromObject } from '@utils/pagination';

import { ListUsersService } from './ListUsersService';

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const pagination = getPaginationFromObject(request.query);

    const listUsersService = container.resolve(ListUsersService);

    const { users } = await listUsersService.execute(pagination);

    return response.json({ users, nextPageURL: request.nextPageURL });
  }
}

export { ListUsersController };
