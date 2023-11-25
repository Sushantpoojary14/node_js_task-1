const { Client } = require("pg");
require('dotenv').config();

const client = new Client({
  user: process.env.user,
  host: process.env.host,
  database: process.env.db,
  password: process.env.password,
  port: 5432,
});

const newTableFromQuery = async () => {
 
   const conn = await client.connect(); 
    const query = `
      CREATE TABLE IF NOT EXISTS "books" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(100) NOT NULL,
        "author" VARCHAR(40) NOT NULL,
        "publication_year" VARCHAR(10) NOT NULL
      );
    `;
     await client.query(query);
};

newTableFromQuery()
  .then(() => console.log('New table created!'))
  .catch(error => console.log("Connection failed: " + error));

module.exports = client;
