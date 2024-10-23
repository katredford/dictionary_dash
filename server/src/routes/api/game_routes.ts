import express from 'express';

import {
  getAllGames,
  createGame
}  from '../../controllers/game_controller.js'

const router = express.Router();

router.get('/', getAllGames);

router.post('/', createGame);

export { router as gameRouter };