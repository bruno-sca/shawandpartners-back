import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(pagination?: PaginationOptions) {
    const users = await this.usersRepository.listUsers(pagination);

    return { users };
  }
}

export { ListUsersService };
