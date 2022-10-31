const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const app = express();
const port = 3001;

const pool = new Pool({ 
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  ssl: {rejectUnauthorized: false}
  
});

process.on('SIGINT', function() {
  pool.end();
  console.log('Application successfully shutdown');
  process.exit(0);
});
   
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    pool
        .query('SELECT * FROM menuitems WHERE itemid = 1;')
        .then(query_res => {
            var item = query_res.rows[0];
            const data = {item: item};
            console.log(item);
            res.render('index', data);
        });
  });
app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`);
  });