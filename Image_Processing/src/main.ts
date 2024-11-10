import express, { Request, Response } from 'express';
import imageProcessRoutes from './utilities';

const app = express();
const port: number = 4001;

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Service is healthy!' });
});

imageProcessRoutes(app);

app.listen(port, (): void => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
