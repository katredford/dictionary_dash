import { Request, Response } from 'express';
import {User, Game} from '../models/index.js';

export const getAllUsers = async (_req: Request, res: Response) => {
  try{
    const users = await User.findAll({
      attributes: {exclude: ['password']}
    });
    res.json(users);
  }catch (error: unknown){
    res.status(500).json({message: "internal server error"});
  }
}

export const getOneUser = async (req: Request, res: Response) => {
    const paramsId = req.params.id;
  try{
    const user = await User.findByPk(paramsId, {
      attributes: { exclude: ['password'] },
      include: [Game]
        
      
    });
    if(user) {
      res.json(user)
    } else {
      res.status(404).json({message: 'not found'});
    }
  }catch (error: any) {
    res.status(500).json({message: error.message})
  }
};

export const createUser = async ( req: Request, res: Response) => {
  const { username, password} = req.body;

  try{
    const newUser = await User.create({ username, password});
    res.status(201).json(newUser);
  }catch (error: unknown) {
    res.status(400).json({ message: "user cannot be found"})
  }
}

export const patchUser = async (req: Request, res: Response) => {
  const paramsId = req.params.id;
try{
  const user = await User.findByPk(paramsId);
  if(user) {
    user.username = req.body.username
    user.password = req.body.password
    await user.save();
    res.json(user)
  } else {
    res.status(404).json({message: 'not found'});
  }
}catch (error: any) {
  res.status(500).json({message: error.message})
}
};

export const deleteUser = async (req: Request, res: Response ) => {
    const paramsId = req.params.id;
  try{
    const user = await User.findByPk(paramsId);

    let deletedUser = user?.username
    if(user) {
      await user.destroy();

      res.json({message: `${deletedUser} was deleted`});
    } else {
      res.status(404).json({message: 'not found'});
    }
  }catch (error: any) {
    res.status(500).json({message: error.message})
  }
};
