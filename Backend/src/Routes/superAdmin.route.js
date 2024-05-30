import { Router } from 'express'
import { verifyJWT } from '../Middlewares/auth.middleware.js'
import { checkAdmin } from '../Middlewares/checkAdmin.middleware.js';
import { fetchInventoryByUserId, fetchItemsByInventoryId, showAllInventories, showAllUsers } from '../Controllers/admin.controller.js';

const router=Router();


router.route('/inventory').get(verifyJWT, showAllInventories);
router.route('/users').get(verifyJWT, showAllUsers);
router.route('/users/fetchinventory').get(verifyJWT,checkAdmin, showAllUsers, fetchInventoryByUserId);
router.route('/users/fetchinventory/fetchitems').get(verifyJWT,checkAdmin, showAllUsers, fetchInventoryByUserId,fetchItemsByInventoryId);

export default router;