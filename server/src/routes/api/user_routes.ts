import express from 'express';
import{
  getAllUsers,
  createUser,
  getOneUser,
  patchUser,
  deleteUser
} from '../../controllers/user-controller.js';

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getOneUser);

router.post('/', createUser);

router.patch('/:id', patchUser);

router.delete('/:id', deleteUser);

export { router as userRouter };