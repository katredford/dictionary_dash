import { Router } from 'express';

import { userRouter } from './user_routes.js';

const router = Router();

router.use('/users', userRouter);

export default router;