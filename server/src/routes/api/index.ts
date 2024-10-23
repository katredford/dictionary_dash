import { Router } from 'express';

import { userRouter } from './user_routes.js';
import { gameRouter } from './game_routes.js'

const router = Router();

router.use('/games', gameRouter)
router.use('/users', userRouter);

export default router;