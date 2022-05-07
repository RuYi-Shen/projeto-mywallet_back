import { Router } from 'express';
import { getHistory, addRecord, editRecord, deleteRecord } from '../controllers/historyController.js';

import { validateRecord, validateToken, validateId } from '../middlewares/historyMiddleware.js';

const historyRouter = Router();

historyRouter.use(validateToken);

historyRouter.get('/history', getHistory);
historyRouter.post('/history', validateRecord, addRecord);
historyRouter.put('/history/:id', validateRecord, validateId, editRecord);
historyRouter.delete('/history/:id', validateId, deleteRecord);

export default historyRouter;