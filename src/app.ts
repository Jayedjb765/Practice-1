import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
const app: Application = express();

//miiddleware

app.use(express.json());
app.use(cors());
app.use('/api/v1/stidents', StudentRoutes);
const getAcontroller = (req: Request, res: Response) => {
  res.send('Hello World!');
};
app.get('/', getAcontroller);

export default app;
