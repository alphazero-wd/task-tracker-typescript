import 'reflect-metadata';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import express from 'express';
import { Task } from './models/Task';
import tasksRouter from './routes/tasks';
import userRouter from './routes/user';
import { User } from './models/User';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
import { __prod__ } from './utils/constants';
(async () => {
  const connection = await createConnection({
    type: 'postgres',
    entities: [Task, User],
    url: process.env.CONNECTION_URI,
    logging: !__prod__,
    synchronize: !__prod__,
  });
  await connection.runMigrations();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // change the domain later
  app.use(
    cors({
      origin: __prod__
        ? 'https://mern-task-tracker.netlify.app'
        : 'http://localhost:3000',
    })
  );

  app.get('/', (_, res) => {
    res.send('Hello World');
  });

  app.use('/api/tasks', tasksRouter);
  app.use('/api/user', userRouter);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
