import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import { __prod__ } from "./utils/constants";
import path from "path";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";

(async () => {
  try {
    const schema = await buildSchema({
      resolvers: [path.join(__dirname, "resolvers/*.*")],
    });
    const connection = await createConnection({
      type: "postgres",
      entities: [path.join(__dirname, "entity/*.*")],
      url: process.env.DATABASE_URL,
      logging: !__prod__,
      synchronize: !__prod__,
      migrations: [path.join(__dirname, "./migration/*")],
      ssl: __prod__ && { rejectUnauthorized: false },
    });
    await connection.runMigrations();
    const app = express();

    const apolloServer = new ApolloServer({
      context: ({ req, res }) => ({ req, res }),
      schema,
    });
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // change the domain later
    app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
      })
    );

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
