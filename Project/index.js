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
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");

/**
 * Creates a map for the menu items currently displayed
 * @param {*} data Member where completed map is to be added
 */
function createMenuMap(data){ //creates map between itemid and item objects and adds to data
  var menuMap = new Map();     
  pool
    .query('SELECT * FROM menuitems where active = true ORDER BY itemid;')
    .then(query_res => {
      for (let i = 0; i < query_res.rowCount; i++){            
        menuMap.set(query_res.rows[i].itemid, query_res.rows[i]);
      }
      data['menuMap'] = menuMap
    });
}

/**
 * Creates a map for the menu items that are not toppings
 * @param {*} data Member where completed map is to be added
 */
function createInvMenuMap(data){ //creates map between itemid and item objects and adds to data
  var menuMap = new Map();     
  pool
    .query('SELECT * FROM menuitems WHERE itemid < 90 ORDER BY itemid;')
    .then(query_res => {
      for (let i = 0; i < query_res.rowCount; i++){            
        menuMap.set(query_res.rows[i].itemid, query_res.rows[i]);
      }
      data['menuMap'] = menuMap
    });
}

/**
 * Creates a map for inventory items
 * @param {*} managerData Member where completed map is to be added
 */
function createInventoryMap(managerData){
  var inventoryMap = new Map();
  pool
    .query('SELECT * FROM inventory ORDER BY inventoryid')
    .then(query_res => {
      for (let i = 0; i < query_res.rowCount; i++){
        inventoryMap.set(query_res.rows[i].inventoryid, query_res.rows[i]);
      }
      managerData['inventoryMap'] = inventoryMap
    });
}

/**
 * Creates a map with customer transaction information
 * @param {*} managerData Member where completed map is to be added
 */
function createTransactionsMap(managerData){
  var transactionsMap = new Map();
  pool
    .query('SELECT * FROM customertransactions order by transactionid desc, itemnum asc;')
    .then(query_res => {
      for (let i = 0; i < query_res.rowCount; i++){
        transactionsMap.set(query_res.rows[i].transactionid, query_res.rows[i]);
      }
      managerData['transactionsMap'] = transactionsMap
    });
}

/**
 * Creates a map with inventory transaction information
 * @param {*} managerData Member where completed map is to be added
 */
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

function createNotificationsMap(managerData){
  var notificationsMap = new Map();
  pool
      .query('SELECT * FROM notifications;')
      .then(query_res => {
      for (let i = 0; i < query_res.rowCount; i++){            
        notificationsMap.set(query_res.rows[i].notificationid, query_res.rows[i]);                
      }
      managerData['notificationsMap'] = notificationsMap
    });    
}

/**
 * Creates an array containing current menu
 * @param {*} data Member where completed array is to be added
 */
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

app.get('/server', (req, res) => {
  res.render('serverGUI',  {data: data }); //renders data object to server
});

app.get('/', (req, res) => {
  res.render('',  {data: data }); //renders data object to index
});

managerData = {} //stores objects to be rendered for manager
var managerCatagories = ['Home', 'Inventory', 'Finance', 'Transactions', 'Menu Items']

createInvMenuMap(managerData)
createInventoryMap(managerData)
createInventoryTransactionsMap(managerData)
createTransactionsMap(managerData)
createNotificationsMap(managerData)

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
app.post('/query', jsonParser, function(req, res) {
  const {q} = req.body;
  
  pool  
    .query(q) //queries each category
 

});

app.post('/getorderid', jsonParser, function(req, res) {
  const {q} = req.body;

  
  pool  
    .query(q) //queries each category
    .then(query_res => {
    var max = query_res.rows[0].max
    res.send({max})
    });
 

});


app.post('/getemployeeids', jsonParser, function(req, res) {
  
  const {q} = req.body;

  pool  
    .query(q) //queries each category
    .then(query_res => {
    var staffIds = []
    
    for(let i = 0; i < query_res.rowCount; i++){
      let staffid = query_res.rows[i].staffid
      staffIds.push(staffid)
    }

    res.send({staffIds})
    });
 
});

//gets each inventory items current stock
app.post('/getinventorystatus', jsonParser, function(req, res) {
  
  const {q} = req.body;

  pool  
    .query(q) //queries each category
    .then(query_res => {
    var inventoryIds = []
    var itemAmounts = []
    var thresholds = []
    
    for(let i = 0; i < query_res.rowCount; i++){
      //inventory.set(query_res.rows[i].inventoryid, query_res.rows[i].itemamount) //stores amount with each id in a map
      
      //var status = {inventoryid: query_res.rows[i].inventoryid, itemamount: query_res.rows[i].itemamount}
      inventoryIds.push(query_res.rows[i].inventoryid)
      itemAmounts.push(query_res.rows[i].itemamount)
      thresholds.push(query_res.rows[i].threshold)

    }
    inventory = {inventoryIds: inventoryIds, itemAmounts: itemAmounts, thresholds, thresholds}
    res.send({inventory})
    });
 
});

app.post('/getSalesReport', jsonParser, function(req, res) {
  const {q} = req.body;
  console.log(q)
  pool
  .query(q) //queries each category
    .then(query_res => {
    var itemIds = []
    
    for(let i = 0; i < query_res.rowCount; i++){
      let itemid = query_res.rows[i].itemid
      let sum = query_res.rows[i].sum
      let count = query_res.rows[i].count
      let sales = {itemid: itemid, count: count, sum: sum} 
      itemIds.push(sales)
    }

    res.send({itemIds})
    });
})


app.post('/getmenuinfo', jsonParser, function(req, res) {
  const {q} = req.body;
  pool
  .query(q) 
    .then(query_res => {
    var id = query_res.rows[0].itemid;
    var name = query_res.rows[0].itemname;
    var price = query_res.rows[0].price;
    var i1 = query_res.rows[0].ingredient1;
    var i2 = query_res.rows[0].ingredient2;
    var i3 = query_res.rows[0].ingredient3;
    var i4 = query_res.rows[0].ingredient4;
    var i5 = query_res.rows[0].ingredient5;
    var i6 = query_res.rows[0].ingredient6;
    var category = query_res.rows[0].category;
    var hastoppings = query_res.rows[0].hastoppings;
    var active = query_res.rows[0].hastoppings;
    var url = query_res.rows[0].url;
    var item = {name: name, price: price, i1: i1, i2: i2, i3: i3, i4: i4, i5: i5, i6: i6, category: category, url: url, 
    hastoppings: hastoppings, active: active, id:id}
    res.send({item})
    });
})