import { Router } from 'express'
import { verifyJWT } from '../Middlewares/auth.middleware.js'
import { checkAdmin } from '../Middlewares/checkAdmin.middleware.js';
import { fetchCoordinatesofInventories, fetchInventoryByUserId, fetchItemsByInventoryId, showAllInventories, showAllUsers, showItemDetailsById } from '../Controllers/admin.controller.js';

const router = Router();


router.route('/inventory').get(verifyJWT, checkAdmin, showAllInventories);
router.route('/users').get(verifyJWT, checkAdmin, showAllUsers);
router.route('/fetchinventory').get(verifyJWT, checkAdmin, fetchInventoryByUserId);
router.route('/fetchinventory/fetchitems').get(verifyJWT, checkAdmin, fetchInventoryByUserId, fetchItemsByInventoryId);
router.route('/fetchcoordinates').get(verifyJWT, checkAdmin, fetchCoordinatesofInventories);

export default router;