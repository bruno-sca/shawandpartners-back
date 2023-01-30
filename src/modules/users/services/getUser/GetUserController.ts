import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserService } from './GetUserService';

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const getUserService = container.resolve(GetUserService);

    const { user } = await getUserService.execute(username);

    return response.json({ user });
  }
}

export { GetUserController };
