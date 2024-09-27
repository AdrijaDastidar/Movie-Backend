import express from 'express';
import { getUsers, createUser, loginUser, updatePassword} from '../controllers/user.controller.js';

const userRouter = express.Router(); 

userRouter.get('/allUsers', getUsers);
userRouter.post('/create', createUser);
userRouter.post('/login', loginUser);
userRouter.put('/:name', updatePassword);



export default userRouter;
