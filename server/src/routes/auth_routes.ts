import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async ( req: Request, res: Response) => {
  const { username, password} = req.body;

  const user = await User.findOne({
    where: { username },
  });

  if(!user) {
    return res.status(401).json({message: "autnentication failed auth_routes"});
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if(!passwordValid) {
    return res.status(401).json({message: "autnentication failed auth_routes"})
  }

  const secret = process.env.JWT_SECRET || '';

  const token = jwt.sign({username}, secret, {expiresIn: '1h'});

  return res.json({token});
};

const router = Router();

router.post('/login', login);

export default router;