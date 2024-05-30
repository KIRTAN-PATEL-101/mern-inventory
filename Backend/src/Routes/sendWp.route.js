import { Router } from 'express'
import { sendWp } from '../Controllers/whatsapp.controller.js'


const router = Router();

router.route('/send').post(sendWp);

export default router;