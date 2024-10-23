import { Request, Response } from 'express';
import {User, Game} from '../models/index.js';

export const getAllGames = async (_req: Request, res: Response) => {
  try{
    const games = await Game.findAll({
      include: [
        {
          model: User,
          as: 'assignedUser', // This should match the alias defined in the association
          attributes: ['username'], // Include only the username attribute
        },
      ],
    });
    res.json(games);
  }catch (error: unknown){
    res.status(500).json({message: "internal server error"});
  }
}

export const createGame = async (req: Request, res: Response) => {

  try {
    const newGame = await Game.create(req.body);
    res.status(201).json(newGame);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};