import { connectDB } from "./DB/index.js";
import app from "./app.js";
import bodyparser from "body-parser";

app.use(bodyparser.json());

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is litsening on port number ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed.", err);
    });

app.get("/", (req, res) => {
    res.send("Api is working");
});
