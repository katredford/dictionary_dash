import express from 'express';
import { authenticationToken } from '../../middleware/auth.js';
import {
  getAllUsers,
  createUser,
  getOneUser,
  patchUser,
  deleteUser,
  addFriend
} from '../../controllers/user_controller.js';

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getOneUser);

router.post('/', createUser);

router.post('/friend/:friendId', authenticationToken, addFriend);

router.patch('/:id', patchUser);

router.delete('/:id', deleteUser);


export { router as userRouter };