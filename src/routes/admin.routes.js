import express from 'express';
import { getUsers,getAdmin, createAdmin, loginAdmin, updateAdminPassword} from '../controllers/admin.controllers.js';

const adminRouter = express.Router(); 

adminRouter.get('/allUsers', getUsers);
adminRouter.get('/allAdmins', getAdmin);
adminRouter.post('/create', createAdmin);
adminRouter.post('/login', loginAdmin);
adminRouter.put('/:email', updateAdminPassword);

export default adminRouter;