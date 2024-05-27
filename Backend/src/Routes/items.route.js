import { Router } from 'express'
import { verifyJWT } from '../Middlewares/auth.middleware.js'
import {addItem,inventoryItems,itemDetails,addTriggeramount,adjustQuantity,showallItems} from '../Controllers/items.controller.js'
import { upload } from "../Middlewares/multer.middleware.js";
import {checkStockLevels} from '../Middlewares/checkStocklevel.middleware.js'

const router=Router();

router.route('/add').post(verifyJWT,
    upload.fields([
    {
      name: "itemimage",
      maxCount: 1,
    },
  ]),addItem);

  router.route('/inventoryItems').post(verifyJWT,inventoryItems)
  router.route('/itemdetails').post(verifyJWT,itemDetails)
  router.route('/settrigger').post(verifyJWT,addTriggeramount,checkStockLevels)
  router.route('/adjustqty').post(verifyJWT,adjustQuantity,checkStockLevels)
  router.route('/showall').post(verifyJWT,showallItems)

export default router;