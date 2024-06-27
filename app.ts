import express, {Application} from "express";
import { studentRouter } from "./src/routes/studentRouter.ts";
import database from "./src/config/database.ts";
import { threadId } from "worker_threads";


const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/students", studentRouter);

database.getConnection((err, connection) => {
    if (err) {
        return console.error(err);
    }
    console.log("Successfully connected :", connection, threadId);
});

app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
  });
  