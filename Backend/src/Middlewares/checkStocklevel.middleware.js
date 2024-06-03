import { Item } from '../models/item.models.js'; 
import { sendEmail } from '../Controllers/emailsender.controller.js'; 
import { User } from '../models/users.models.js';
import { sendWp } from '../Controllers/whatsapp.controller.js';

async function checkStockLevels(req, res, next) {
    try {
        console.log("Hello World");
        const items = await Item.find({});
        // console.log(items);
        const now = new Date();
        const userMail = req.user.email;
        const user = await User.findOne({ email: userMail });
        // console.log(user);

        for (const item of items) {
            const shouldNotify = !item.lastNotification || (now - item.lastNotification > 86400000); 

            if (item.stock < item.triggerAmount && shouldNotify) {
                const message = `Stock alert for ${item.itemName}: Available stock (${item.stock}) is below the threshold (${item.triggerAmount}).`;
                await sendEmail(userMail, 'Stock Alert', message); 
                await sendWp(message);

                console.log(`Notification sent for ${item.itemName}`);
                // Update the last notification time
                item.lastNotification = now;
                await item.save();
            }
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error checking stock levels: ', error);
        res.status(500).send('Failed to check stock levels.');
    }
}
export { checkStockLevels };
