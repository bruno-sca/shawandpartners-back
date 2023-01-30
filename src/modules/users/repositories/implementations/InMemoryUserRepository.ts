import { DetailedUser } from '@modules/users/models/DetailedUser';
import { User } from '@modules/users/models/User';
import { UserRepo } from '@modules/users/models/UserRepo';

import { IUsersRepository } from '../IUsersRepository';

export class InMemoryUserRepository implements IUsersRepository {
  public users: DetailedUser[] = [];
  public repos: UserRepo[] = [];

  async findUserByUsername(username: string): Promise<DetailedUser> {
    return this.users.find(({ login }) => login === username);
  }

  async listUsers(pagination?: PaginationOptions): Promise<User[]> {
    const { page, pageSize } = pagination || {
      page: 1,
      pageSize: 10,
    };

    return this.users.slice((page - 1) * pageSize, page * pageSize);
  }

  async listUserRepos(
    username: string,
    pagination?: PaginationOptions
  ): Promise<UserRepo[]> {
    if (!this.users.some(({ login }) => login === username)) return undefined;

    const { page, pageSize } = pagination || {
      page: 1,
      pageSize: 10,
    };

    return this.repos.slice((page - 1) * pageSize, page * pageSize);
  }
}
