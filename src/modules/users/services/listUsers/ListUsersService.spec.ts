import { InMemoryUserRepository } from '@modules/users/repositories/implementations/InMemoryUserRepository';

import { ListUsersService } from './ListUsersService';

let inMemoryUserRepository: InMemoryUserRepository;
let listUsersService: ListUsersService;

describe('List Users Service', () => {
  beforeAll(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    listUsersService = new ListUsersService(inMemoryUserRepository);

    inMemoryUserRepository.users = [...Array(10).keys()].map((index) => ({
      avatar_url: 'avatar_url',
      created_at: 'created_at',
      id: index + 1,
      login: `login${index + 1}`,
    }));
  });

  it('should be able to list users', async () => {
    const users = await listUsersService.execute();

    expect(users).toHaveLength(10);
  });

  it('should be able to list users with pagination', async () => {
    let users = await listUsersService.execute({ page: 1, pageSize: 5 });

    expect(users).toHaveLength(5);
    expect(users[0].id).toBe(1);
    expect(users[4].id).toBe(5);

    users = await listUsersService.execute({ page: 2, pageSize: 5 });

    expect(users).toHaveLength(5);
    expect(users[0].id).toBe(6);
    expect(users[4].id).toBe(10);
  });
});
