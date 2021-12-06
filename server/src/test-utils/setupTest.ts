import { testConnection } from "./db";

testConnection(true).then(() => process.exit());
