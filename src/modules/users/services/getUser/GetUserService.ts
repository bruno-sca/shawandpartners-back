import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { NotFoundException } from '@shared/errors/NotFoundException';

@injectable()
class GetUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(username: string) {
    const user = await this.usersRepository.findUserByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user };
  }
}

export { GetUserService };
