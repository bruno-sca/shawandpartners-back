import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { GitHubProxyUsersRepository } from '@modules/users/repositories/implementations/GitHubProxyUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  GitHubProxyUsersRepository
);
