import { Router } from 'express';
import { getHistory, addRecord, editRecord, deleteRecord } from './controllers/historyController.js';

const userRouter = Router();

userRouter.get('/history', getHistory);
userRouter.post('/history', addRecord);
userRouter.put('/history/:id', editRecord);
userRouter.delete('/history/:id', deleteRecord);

export default userRouter;