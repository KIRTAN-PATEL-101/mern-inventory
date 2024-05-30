import { Router } from 'express'
import { verifyJWT } from '../Middlewares/auth.middleware.js'
import { addInventory, showallInventories, updateInventory, deleteInventory } from '../Controllers/inventory.controller.js'

const router = Router();

router.route('/add').post(verifyJWT, addInventory);
router.route('/update').post(verifyJWT, updateInventory);
router.route('/show').get(verifyJWT, showallInventories);
router.route('/delete').delete(verifyJWT, deleteInventory);

export default router;