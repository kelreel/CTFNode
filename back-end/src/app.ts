import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import UserController from "./controllers/UserController";
import TaskController from "./controllers/TaskController";
import { errorMiddleware } from "./utils/errorHandler";

const app = express();

app.set("trust proxy", 1);
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(errorMiddleware)

app.use("/api/users", UserController);
app.use("/api/tasks", TaskController);

export default app;
