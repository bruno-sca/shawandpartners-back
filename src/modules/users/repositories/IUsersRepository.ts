import { DetailedUser } from '../models/DetailedUser';
import { User } from '../models/User';
import { UserRepo } from '../models/UserRepo';

export interface IUsersRepository {
  findUserByUsername(username: string): Promise<DetailedUser | undefined>;
  listUsers(pagination?: PaginationOptions): Promise<User[]>;
  listUserRepos(
    username: string,
    pagination?: PaginationOptions
  ): Promise<UserRepo[]>;
}
