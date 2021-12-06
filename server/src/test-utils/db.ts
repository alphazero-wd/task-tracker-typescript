import "dotenv/config";
import { createConnection } from "typeorm";
import { User } from "../entity/User";
import { Task } from "../entity/Task";

export const testConnection = (drop: boolean = false) => {
  return createConnection({
    type: "postgres",
    url: process.env.DATABASE_TEST_URL,
    dropSchema: drop,
    synchronize: drop,
    entities: [User, Task],
  });
};
