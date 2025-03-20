import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routs';

const app: Application = express();

//miiddleware

app.use(express.json());
app.use(cors());
app.use('/api/v1', router);

const getAcontroller = (req: Request, res: Response) => {
  res.send('Hello World!');
};
const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};
app.get('/', test);
app.get('/', getAcontroller);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
