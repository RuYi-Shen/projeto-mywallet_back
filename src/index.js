import express, { json } from "express";
import cors from "cors";

import authRouter from './routes/authRouter.js';
import historyRouter from './routes/historyRouter.js';

const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);
app.use(historyRouter);

app.listen(5000, () => {
  console.log('Server is listening on port 5000.');
});
