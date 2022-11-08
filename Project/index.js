const express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
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

function createInventoryMap(managerData){
  var inventoryMap = new Map();
  pool
    .query('SELECT * FROM inventory;')
    .then(query_res => {
      for (let i = 0; i < query_res.rowCount; i++){            
        inventoryMap.set(query_res.rows[i].inventoryid, query_res.rows[i]);                
      }
      managerData['inventoryMap'] = inventoryMap     
    });    
}

function createTransactionsMap(managerData){
  var transactionsMap = new Map();
  pool
    .query('SELECT * FROM customertransactions;')
    .then(query_res => {
      for (let i = 0; i < query_res.rowCount; i++){            
        transactionsMap.set(query_res.rows[i].transactionid, query_res.rows[i]);                
      }
      managerData['transactionsMap'] = transactionsMap
    });    
}

function createInventoryTransactionsMap(managerData){
  var inventoryTransactionsMap = new Map();
  pool
    .query('SELECT * FROM inventorytransactions;')
    .then(query_res => {
      for (let i = 0; i < query_res.rowCount; i++){            
        inventoryTransactionsMap.set(query_res.rows[i].orderid, query_res.rows[i]);                
      }
      managerData['inventoryTransactionsMap'] = inventoryTransactionsMap
    });    
}

function createMenuArray(data){ //creates 2d array of each itemid sorted by category and adds to data
  var menuArray = []
  var max = 0
  pool
    .query('SELECT max (category) FROM menuitems;')
    .then(query_res => {
      max = query_res.rows[0].max       
    });

    for (let i = 1; i <= 6; i++){            
      menuArray.push([]); 
      pool   
        .query('SELECT itemid FROM menuitems where category = '+ i +  'order by itemid;') //queries each category
        .then(query_res => {           
          for (let j = 0; j < query_res.rowCount; j++){ 
            menuArray[i-1].push(query_res.rows[j].itemid) //adds each item to its category subarray 
          }      
        });
    } 
    data['menuArray'] = menuArray
}


app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}`);
});

app.use('/views', express.static('views'));

data = {} //stores objects to be rendered

createMenuArray(data);
var categories = ['Burgers', 'Chicken', 'Sides/Drinks', 'Dessert','Toppings','Condiments'];
createMenuMap(data);
data['categories'] = categories;
//console.log(data)

app.get('/', (req, res) => {
  res.render('index',  {data: data }); //renders data object to server
});

managerData = {} //stores objects to be rendered for manager
var managerCatagories = ['Home', 'Inventory', 'Finance', 'Transactions', 'Menu Items']

createMenuMap(managerData)
createInventoryMap(managerData)
createInventoryTransactionsMap(managerData)
createTransactionsMap(managerData)

app.get('/manager', (req, res) => {
  res.render('managerGUI',  {managerData: managerData}); //renders data object to server
});

customerData = {}
var custCategories = ['Burgers', 'Chicken', 'Sides/Drinks', 'Dessert','Toppings','Condiments'];
customerData['categories'] = custCategories;
app.get('/customer', (req, res) => {
  res.render('customerGUI', {customerData: customerData});
});

//post request handles completed transaction
app.post('/', jsonParser, function(req, res) {
  const {q} = req.body;

  console.log(q)
  
  pool  
    .query(q) //queries each category
    .then(query_res => {           
    });

});
