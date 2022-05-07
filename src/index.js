import express, { json } from "express";
import cors from "cors";

import authRouter from './routes/authRouter.js';
import historyRouter from './routes/historyRouter.js';

const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);
app.use(historyRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
})
