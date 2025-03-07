import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { DataSource } from 'typeorm';

import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';

// Instantiate express app
const app: Express = express();
dotenv.config();

// Parse request body
app.use(bodyParser.json());

// Use CORS
app.use(cors());

// Create Database Connection

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

// Define server port
const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    // Start listening to the requests on the defined port
    app.listen(port, () => console.log(`Server listening on port ${port}`));
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

// Use tasksRouter on the default route
app.use('/', tasksRouter);
