import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import express from "express";
import { Task } from "./models/Task";
import tasksRouter from "./routes/tasks";
import userRouter from "./routes/user";
import { User } from "./models/User";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import { __prod__ } from "./utils/constants";
import path from "path";
(async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      entities: [Task, User],
      url: process.env.DATABASE_URL,
      logging: !__prod__,
      // synchronize: !__prod__,
      migrations: [path.join(__dirname, "./migrations/*")],
      ssl: __prod__ && { rejectUnauthorized: false },
    });
    await connection.runMigrations();
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // change the domain later
    app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
      })
    );

    app.get("/", (_, res) => {
      res.send("Hello World");
    });

    app.use("/api/tasks", tasksRouter);
    app.use("/api/user", userRouter);
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
