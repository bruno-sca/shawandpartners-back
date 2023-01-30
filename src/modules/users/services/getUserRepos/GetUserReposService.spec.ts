import { InMemoryUserRepository } from '@modules/users/repositories/implementations/InMemoryUserRepository';
import { NotFoundException } from '@shared/errors/NotFoundException';

import { GetUserReposService } from './GetUserReposService';

let inMemoryUserRepository: InMemoryUserRepository;
let getUserReposService: GetUserReposService;

describe('Get User Repos Service', () => {
  beforeAll(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    getUserReposService = new GetUserReposService(inMemoryUserRepository);

    inMemoryUserRepository.users = [
      {
        avatar_url: 'avatar_url',
        created_at: 'created_at',
        id: 1,
        login: 'login1',
      },
    ];
    inMemoryUserRepository.repos = [...Array(10).keys()].map((index) => ({
      html_url: 'html_url',
      id: index + 1,
      name: `name${index + 1}`,
      owner: {
        login: 'login1',
      },
    }));
  });

  it('should be able to get user repos by username', async () => {
    const { repos } = await getUserReposService.execute('login1');

    expect(repos).toHaveLength(10);
  });

  it('should be able to get user repos by username with pagination', async () => {
    let { repos } = await getUserReposService.execute('login1', {
      page: 1,
      pageSize: 5,
    });

    expect(repos).toHaveLength(5);
    expect(repos[0].id).toBe(1);
    expect(repos[4].id).toBe(5);

    ({ repos } = await getUserReposService.execute('login1', {
      page: 2,
      pageSize: 5,
    }));

    expect(repos).toHaveLength(5);
    expect(repos[0].id).toBe(6);
    expect(repos[4].id).toBe(10);
  });

  it('should not be able to get user repos by username if user does not exist', async () => {
    await expect(getUserReposService.execute('login2')).rejects.toEqual(
      new NotFoundException('User not found')
    );
  });
});
