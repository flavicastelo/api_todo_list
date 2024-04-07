import  express from "express";
import cors from "cors";
import router from "./routes/router.js";

const app = express();
app.use(express.json()); //para usar json no post
app.use(cors());

app.use("/api", router)
app.listen(3000);