import { Item } from '../models/item.models.js'; 
import { sendEmail } from '../Controllers/emailsender.controller.js'; 
import { User } from '../models/users.models.js';
import { sendWp } from '../Controllers/whatsapp.controller.js';

async function checkStockLevels(req, res, next) {
  try {
    console.log("Checking stock levels...");
    const changedItems = req.changedItem || [];
    console.log("Changed Item: ",changedItems);
    const now = new Date();
    const userMail = req.user.email;

    for (const item of changedItems) {
      const shouldNotify = true;

      if (item.stock < item.triggerAmount && shouldNotify) {
        const message = `Stock alert for ${item.itemName}: Available stock (${item.stock}) is below the threshold (${item.triggerAmount}).`;
        await sendEmail(userMail, 'Stock Alert', message);
        console.log("Mail Sent Successfully.");
        await sendWp(message);

        console.log(`Notification sent for ${item.itemName}`);
        item.lastNotification = now;
        await item.save();
      }
    }
    next();
  } catch (error) {
    console.error('Error checking stock levels: ', error);
    res.status(500).send('Failed to check stock levels.');
  }
}
export { checkStockLevels };
