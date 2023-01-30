import { InMemoryUserRepository } from '@modules/users/repositories/implementations/InMemoryUserRepository';
import { NotFoundException } from '@shared/errors/NotFoundException';

import { GetUserService } from './GetUserService';

let inMemoryUserRepository: InMemoryUserRepository;
let getUserService: GetUserService;

describe('Get User Service', () => {
  beforeAll(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    getUserService = new GetUserService(inMemoryUserRepository);

    inMemoryUserRepository.users = [
      {
        avatar_url: 'avatar_url',
        created_at: 'created_at',
        id: 1,
        login: 'login1',
      },
    ];
  });

  it('should be able to get user by username', async () => {
    const { user } = await getUserService.execute('login1');

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('login');
    expect(user).toHaveProperty('avatar_url');
    expect(user).toHaveProperty('created_at');
  });

  it('should not be able to get user by username if user does not exist', async () => {
    await expect(getUserService.execute('login2')).rejects.toEqual(
      new NotFoundException('User not found')
    );
  });
});
