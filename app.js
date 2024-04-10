import  express from "express";
import cors from "cors";
import router from "./routes/router.js";

const app = express();
app.use(express.json()); 
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true, 
  }));

app.use("/api", router)
app.listen(3000);