import { Item } from '../models/item.models.js'; 
import { sendEmail } from '../Controllers/emailsender.controller.js'; 
import { User } from '../models/users.models.js';
import { sendWp } from '../Controllers/whatsapp.controller.js';

// Middleware to check stock levels and send notifications
async function checkStockLevels(req, res, next) {
    try {
        console.log("Hello World");
        const items = await Item.find({userId:req.user._id});
        const now = new Date();
        const userMail = req.user.email;
        const user = await User.findOne({ email: userMail });

        console.log("Items fetched: ", items.length);
        console.log("User email: ", userMail);

        for (const item of items) {
            const shouldNotify = !item.lastNotification || (now - item.lastNotification > 86400); 
            console.log(`Checking item: ${item.itemName}, Stock: ${item.stock}, Trigger: ${item.triggerAmount}, Should Notify: ${shouldNotify}`);

            if (item.stock < item.triggerAmount && shouldNotify) {
                const message = `Stock alert for ${item.itemName}: Available stock (${item.stock}) is below the threshold (${item.triggerAmount}).`;
                console.log("Sending email to: ", userMail);
                await sendEmail(userMail, 'Stock Alert', message);
                console.log("Mail Sent Successfully.");
                await sendWp(message);
                console.log("Whatsapp Message sent");

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

// Middleware to log a message after checking stock levels
function logPostCheck(req, res, next) {
    console.log('This is executed after checkStockLevels middleware');
    next(); // Proceed to the next middleware or route handler
}

export { checkStockLevels, logPostCheck };
