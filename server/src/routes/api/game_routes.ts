import express from 'express';
import { authenticationToken } from '../../middleware/auth.js';
import {
  getAllGames,
  createGame
}  from '../../controllers/game_controller.js'

const router = express.Router();

router.get('/', getAllGames);

router.post('/',authenticationToken, createGame);

export { router as gameRouter };