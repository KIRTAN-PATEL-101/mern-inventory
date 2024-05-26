import { Router } from 'express'
import { verifyJWT } from '../Middlewares/auth.middleware.js'
import {addInventory,showallInventories,updateInventory} from '../Controllers/inventory.controller.js'

const router=Router();

router.route('/add').post(verifyJWT,addInventory);
router.route('/update').post(verifyJWT,updateInventory);
router.route('/show').post(verifyJWT,showallInventories);

export default router;