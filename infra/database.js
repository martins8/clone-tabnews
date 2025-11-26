import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  });
  try {
    await client.connect();
    console.log("conexão estabelecida");
    const result = await client.query(queryObject);
    console.log("query alcançada");
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
    console.log("conexão finalizada");
  }
}

export default {
  query: query,
};
