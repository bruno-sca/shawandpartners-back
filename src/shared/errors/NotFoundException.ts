import { AppError } from './AppError';

class NotFoundException extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export { NotFoundException };
