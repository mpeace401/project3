const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const app = express();
const port = 3001;

const pool = new Pool({ 
  user: 'csce315_907_garza',
  host:'csce-315-db.engr.tamu.edu',
  database: 'csce315_907_74',
  password: '630004098',
  port: 5432,
  ssl: {rejectUnauthorized: false}
  
});

process.on('SIGINT', function() {
  pool.end();
  console.log('Application successfully shutdown');
  process.exit(0);
});
   
app.set("view engine", "ejs");

function createMenuMap(){
  app.get('/', (req, res) => {
      let menuMap = new Map();   
      pool
          .query('SELECT * FROM menuitems;')
          .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){            
              menuMap.set(query_res.rows[i].itemid, query_res.rows[i]);    
            }
              const data = {menuMap: menuMap};
              //console.log(item);
              res.render('index', data);
          });
          return menuMap
  });
}
createMenuMap();
app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`);
  });


