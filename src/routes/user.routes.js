import express from 'express';
import { createUser, loginUser, updatePassword} from '../controllers/user.controller.js';

const userRouter = express.Router(); 

userRouter.post('/create', createUser);
userRouter.post('/login', loginUser);
userRouter.put('/:email', updatePassword);



export default userRouter;
