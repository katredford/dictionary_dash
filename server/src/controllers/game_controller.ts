import { Request, Response } from 'express';
import { User, Game } from '../models/index.js';

export const getAllGames = async (_req: Request, res: Response) => {
  try {
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
  } catch (error: unknown) {
    res.status(500).json({ message: "internal server error" });
  }
}

export const createGame = async (req: Request, res: Response) => {

  try {
    const userId = req.user?.userId;
console.log("create a game", userId)

    if (!userId) {
      return res.status(400).send('Invalid user');
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const newGame = await Game.create({ userId: userId, ...req.body });
    return res.status(201).json(newGame);
  } catch (error: any) {
    const errorMessage = error.message || 'Something went wrong';

    return res.status(400).json({ message: errorMessage });
  }
};