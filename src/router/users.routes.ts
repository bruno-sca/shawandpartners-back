import { Router } from 'express';

import { nextPage } from '@middlewares/nextPage';
import { GetUserController } from '@modules/users/services/getUser/GetUserController';
import { GetUserReposController } from '@modules/users/services/getUserRepos/GetUserReposController';
import { ListUsersController } from '@modules/users/services/listUsers/ListUsersController';

const usersRoutes = Router();

const listUsersController = new ListUsersController();
const getUserController = new GetUserController();
const getUserReposController = new GetUserReposController();

usersRoutes.get('/', nextPage, listUsersController.handle);
usersRoutes.get('/:username', getUserController.handle);
usersRoutes.get('/:username/repos', nextPage, getUserReposController.handle);

export { usersRoutes };
