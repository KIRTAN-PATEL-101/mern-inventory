import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Routes import
import userRouter from './Routes/user.routes.js';
import useInventory from './Routes/inventory.route.js';
import useItems from './Routes/items.route.js';
import adminrouter from './Routes/superAdmin.route.js'

//routes declaration
app.use('/users', userRouter);
app.use('/inventory', useInventory);
app.use('/items', useItems);
app.use('/superadmin', adminrouter);


export default app;
