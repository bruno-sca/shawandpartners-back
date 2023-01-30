import axios, { AxiosInstance } from 'axios';

import { DetailedUser } from '@modules/users/models/DetailedUser';
import { User } from '@modules/users/models/User';
import { UserRepo } from '@modules/users/models/UserRepo';
import { getConvertedPaginationFromObject } from '@utils/pagination';

import { IUsersRepository } from '../IUsersRepository';

class GitHubProxyUsersRepository implements IUsersRepository {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.github.com/users',
    });
  }

  async findUserByUsername(username: string): Promise<DetailedUser> {
    return this.api
      .get(`/${username}`)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.status === 404) return undefined;
        throw error;
      });
  }

  async listUsers(pagination?: PaginationOptions): Promise<User[]> {
    const { pageStart: since, pageSize: per_page } =
      getConvertedPaginationFromObject(pagination);

    return this.api
      .get('', {
        params: {
          since,
          per_page,
        },
      })
      .then((response) => response.data);
  }

  async listUserRepos(
    username: string,
    pagination?: PaginationOptions
  ): Promise<UserRepo[]> {
    return this.api
      .get(`/${username}/repos`, {
        params: {
          ...(pagination || {}),
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.status === 404) return undefined;
        throw error;
      });
  }
}

export { GitHubProxyUsersRepository };
