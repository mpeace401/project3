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

function createMenuMap(data){ //creates map between itemid and item objects and adds to data
  
    var menuMap = new Map();     
    pool
        .query('SELECT * FROM menuitems;')
        .then(query_res => {
          for (let i = 0; i < query_res.rowCount; i++){            
            menuMap.set(query_res.rows[i].itemid, query_res.rows[i]);             
              
          }
           
          data['menuMap'] = menuMap     
        });
        
}

function createMenuArray(data){ //creates array of each itemid and adds to data
  
    var menuArray = [] 
    pool
        .query('SELECT * FROM menuitems order by itemid;')
        .then(query_res => {
          for (let i = 0; i < query_res.rowCount; i++){            
            menuArray.push(query_res.rows[i].itemid);  
            
          }
          
        data['menuArray'] = menuArray 
        });
        
}

app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`);
  });


data = {} //stores objects to be rendered

createMenuArray(data);
createMenuMap(data);


app.get('/', (req, res) => {
 
  res.render('index',  {data: data }); //renders data object to server
});



