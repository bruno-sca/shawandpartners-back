import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import { AppError } from '@errors/AppError';
import '@shared/container';

import { router } from './router';

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: `Internal server error -${err.message}`,
    });
  }
);

export { app };
