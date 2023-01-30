import { inject, injectable } from 'tsyringe';

import { UserRepo } from '@modules/users/models/UserRepo';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { NotFoundException } from '@shared/errors/NotFoundException';

@injectable()
class GetUserReposService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    username: string,
    pagination?: PaginationOptions
  ): Promise<{ repos: UserRepo[] }> {
    const repos = await this.usersRepository.listUserRepos(
      username,
      pagination
    );

    if (!repos) throw new NotFoundException('User not found');

    return { repos };
  }
}

export { GetUserReposService };
